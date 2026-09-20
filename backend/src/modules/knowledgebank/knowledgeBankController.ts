import { Request, Response } from 'express';
import { db } from '../../core/database/db';
import { initialTerminologySeed } from '../../data/seedTerminology';
import { languageRegistry } from '../../core/language/LanguageRegistry';
import { recordAuditLog } from '../../core/security/audit';
import { AuthenticatedRequest } from '../../core/security/rbac';

export const ensureSeedTerminology = () => {
  if (db.count('language_terms') === 0) {
    const formatted = initialTerminologySeed.map(t => ({
      language_code: 'sat',
      term_hi: t.hindi,
      term_target_script: t.targetScript,
      term_target_latin: t.targetLatin,
      phonetic_ipa: t.phoneticIpa,
      meaning_hi: t.meaningHindi,
      subject: t.subject,
      grade: t.grade,
      category: t.category,
      verification_status: t.verificationStatus,
      source: 'GOVT_JHARKHAND_CURRICULUM'
    }));
    db.insertMany('language_terms', formatted);
  }
};

export const listTerms = (req: Request, res: Response): void => {
  const { lang = 'sat', category, status, search, grade } = req.query;

  let terms = db.find('language_terms', t => t.language_code === lang);

  if (category) {
    terms = terms.filter(t => t.category === category);
  }
  if (status) {
    terms = terms.filter(t => t.verification_status === status);
  }
  if (grade) {
    const g = parseInt(grade as string, 10);
    terms = terms.filter(t => t.grade === g);
  }
  if (search) {
    const q = (search as string).toLowerCase();
    terms = terms.filter(t => 
      t.term_hi.toLowerCase().includes(q) ||
      t.term_target_script.toLowerCase().includes(q) ||
      t.term_target_latin.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: terms.length,
    terms
  });
};

export const submitTeacherCorrection = (req: AuthenticatedRequest, res: Response): void => {
  const {
    termHi,
    correctedTargetScript,
    correctedTargetLatin,
    phoneticIpa,
    meaningHi,
    subject = 'General',
    grade = 4,
    lang = 'sat',
    originalAiTranslation
  } = req.body;

  if (!termHi || !correctedTargetScript) {
    res.status(400).json({ success: false, message: 'termHi and correctedTargetScript are required.' });
    return;
  }

  const userId = req.user ? req.user.userId : 'system-teacher-demo';

  // Check if term already exists; if so, update status to TEACHER_REVIEWED
  const existing = db.findOne('language_terms', t => 
    t.language_code === lang && t.term_hi.toLowerCase() === termHi.trim().toLowerCase()
  );

  let record;
  if (existing) {
    record = db.update('language_terms', existing.id, {
      term_target_script: correctedTargetScript,
      term_target_latin: correctedTargetLatin || correctedTargetScript,
      phonetic_ipa: phoneticIpa || existing.phonetic_ipa,
      meaning_hi: meaningHi || existing.meaning_hi,
      verification_status: 'TEACHER_REVIEWED',
      contributor_id: userId
    });
  } else {
    record = db.insert('language_terms', {
      language_code: lang,
      term_hi: termHi.trim(),
      term_target_script: correctedTargetScript,
      term_target_latin: correctedTargetLatin || correctedTargetScript,
      phonetic_ipa: phoneticIpa,
      meaning_hi: meaningHi,
      subject,
      grade,
      category: 'CLASSROOM',
      verification_status: 'TEACHER_REVIEWED',
      contributor_id: userId,
      source: 'TEACHER_CORRECTION_LOOP'
    });
  }

  // Update in-memory language provider so live translations immediately reflect this teacher's correction!
  const provider = languageRegistry.getProvider(lang) as any;
  if (provider && typeof provider.registerTerm === 'function') {
    provider.registerTerm({
      hindi: termHi.trim(),
      targetScript: correctedTargetScript,
      targetLatin: correctedTargetLatin || correctedTargetScript,
      phoneticIpa: phoneticIpa,
      meaningHindi: meaningHi,
      subject,
      grade,
      verificationStatus: 'TEACHER_REVIEWED'
    });
  }

  recordAuditLog(userId, 'TEACHER_CORRECTION_SUBMITTED', 'language_terms', {
    termHi,
    originalAiTranslation,
    correctedTargetScript
  });

  res.json({
    success: true,
    message: 'Correction saved! Local translation memory updated. Propagated for Language Expert verification.',
    record
  });
};

export const updateVerificationStatus = (req: AuthenticatedRequest, res: Response): void => {
  const { id } = req.params;
  const { status, remarks } = req.body;

  const validStatuses = ['AI_GENERATED', 'TEACHER_REVIEWED', 'LANGUAGE_EXPERT_VERIFIED', 'OFFICIALLY_APPROVED'];
  if (!validStatuses.includes(status)) {
    res.status(400).json({ success: false, message: 'Invalid verification status' });
    return;
  }

  const updated = db.update('language_terms', id, {
    verification_status: status,
    verified_by: req.user ? req.user.userId : undefined,
    remarks
  });

  if (!updated) {
    res.status(404).json({ success: false, message: 'Term not found' });
    return;
  }

  res.json({ success: true, message: `Term status updated to ${status}`, term: updated });
};

import { Request, Response } from 'express';
import crypto from 'crypto';
import { db } from '../../core/database/db';

export const listContentPacks = (req: Request, res: Response): void => {
  const { lang = 'sat' } = req.query;

  // Generate packs for Grades 1 to 10
  const packs = [];
  for (let grade = 1; grade <= 10; grade++) {
    const curCount = db.count('curriculum', c => c.grade === grade);
    const termCount = db.count('language_terms', t => t.language_code === lang && (t.grade === grade || !t.grade));
    const version = `v1.${grade}.0`;
    const packHash = crypto.createHash('sha256').update(`pack-${lang}-${grade}-${version}-${termCount}`).digest('hex');

    packs.push({
      id: `pack-${lang}-grade-${grade}`,
      languageCode: lang,
      languageName: lang === 'sat' ? 'Santhali (Ol Chiki)' : lang === 'hoc' ? 'Ho' : 'Mundari',
      grade,
      title: `${lang === 'sat' ? 'Santhali' : 'Regional'} Grade ${grade} Vernacular Learning Pack`,
      version,
      sizeBytes: 1024 * (grade <= 5 ? 480 : 720) + (termCount * 50),
      sizeFormatted: `${(0.48 + grade * 0.05).toFixed(2)} MB`,
      curriculumItemsCount: curCount || 3,
      verifiedTermsCount: termCount || 12,
      fileChecksum: packHash.substring(0, 16),
      updatedAt: new Date().toISOString(),
      offlineAssetsIncluded: [
        'Grade-level Curriculum & Competencies',
        'Verified Ol Chiki Translation Memory',
        'Pronunciation Guide & Offline Phonetic Audio Map',
        'Printable Worksheets & Flashcards Templates',
        'Adaptive Remediation Modules'
      ]
    });
  }

  res.json({ success: true, count: packs.length, packs });
};

export const downloadPackData = (req: Request, res: Response): void => {
  const { packId } = req.params;
  const parts = packId.split('-');
  const lang = parts[1] || 'sat';
  const grade = parseInt(parts[3] || '4', 10);

  const curriculum = db.find('curriculum', c => c.grade === grade);
  const terms = db.find('language_terms', t => t.language_code === lang);

  const packPayload = {
    packId,
    languageCode: lang,
    grade,
    version: `v1.${grade}.0`,
    exportedAt: new Date().toISOString(),
    checksum: crypto.createHash('sha256').update(JSON.stringify({ curriculum, terms })).digest('hex').substring(0, 16),
    data: {
      curriculum,
      terms,
      offlineLessonsSample: [
        {
          topic: grade === 4 ? 'Fractions (भिन्न / ᱦᱟᱹᱴᱤᱧ)' : 'Foundations',
          subject: 'Mathematics',
          explanationHi: 'किसी वस्तु के बराबर भागों को भिन्न कहते हैं।',
          explanationTargetScript: 'ᱡᱚᱠᱷᱚᱱ ᱢᱤᱫᱴᱟᱝ ᱯᱩᱨᱟᱹ ᱡᱤᱱᱤᱥ ᱥᱚᱢᱟᱱ ᱦᱟᱹᱴᱤᱧ ᱨᱮ ᱵᱚᱱ ᱦᱟᱹᱴᱤᱧᱟ, ᱚᱱᱟ ᱜᱮ ᱦᱟᱹᱴᱤᱧ ᱠᱚ ᱢᱮᱛᱟᱜ-ᱟ᱾',
          explanationTargetLatin: 'Jokhon midtang pura jinis soman hatiñ re bon hatiña, ona ge hatiñ ko metag-a.'
        }
      ]
    }
  };

  res.json({ success: true, ...packPayload });
};

export const checkPackDiff = (req: Request, res: Response): void => {
  const { clientPacks } = req.body; // Array of { packId, localVersion, localChecksum }
  const updatesAvailable: any[] = [];

  if (Array.isArray(clientPacks)) {
    for (const cp of clientPacks) {
      // Compare versions
      const parts = cp.packId.split('-');
      const grade = parseInt(parts[3] || '4', 10);
      const serverVersion = `v1.${grade}.0`;
      if (cp.localVersion !== serverVersion) {
        updatesAvailable.push({
          packId: cp.packId,
          needsUpdate: true,
          deltaSizeFormatted: '12 KB',
          serverVersion
        });
      }
    }
  }

  res.json({ success: true, updatesAvailable });
};

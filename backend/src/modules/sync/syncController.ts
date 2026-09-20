import { Request, Response } from 'express';
import { db } from '../../core/database/db';
import { AuthenticatedRequest } from '../../core/security/rbac';

export interface SyncItem {
  clientActionId: string;
  entityType: 'TEACHER_CORRECTION' | 'STUDENT_PROGRESS' | 'ASSESSMENT_RESULT' | 'FEEDBACK';
  action: 'INSERT' | 'UPDATE';
  payload: any;
  clientTimestamp: string;
}

export const processSyncQueue = (req: AuthenticatedRequest, res: Response): void => {
  const { queue } = req.body as { queue: SyncItem[] };

  if (!Array.isArray(queue) || queue.length === 0) {
    res.json({ success: true, processedCount: 0, acknowledgedIds: [], conflicts: [] });
    return;
  }

  const acknowledgedIds: string[] = [];
  const conflicts: any[] = [];
  const userId = req.user ? req.user.userId : 'system-offline-user';

  for (const item of queue) {
    try {
      if (item.entityType === 'TEACHER_CORRECTION') {
        const { termHi, correctedTargetScript, correctedTargetLatin, lang = 'sat' } = item.payload;
        // Conflict check: Has this term been officially approved on the server in the meantime?
        const existing = db.findOne('language_terms', t => 
          t.language_code === lang && t.term_hi.toLowerCase() === termHi.toLowerCase()
        );

        if (existing && existing.verification_status === 'OFFICIALLY_APPROVED') {
          // Conflict detected! Mark conflict for administrative review instead of silent overwrite
          conflicts.push({
            clientActionId: item.clientActionId,
            reason: 'Term was officially locked by State Council while offline. Sent for conflict arbitration.',
            serverVersion: existing
          });
        } else {
          // Apply update cleanly
          if (existing) {
            db.update('language_terms', existing.id, {
              term_target_script: correctedTargetScript,
              term_target_latin: correctedTargetLatin,
              verification_status: 'TEACHER_REVIEWED',
              contributor_id: userId
            });
          } else {
            db.insert('language_terms', {
              language_code: lang,
              term_hi: termHi,
              term_target_script: correctedTargetScript,
              term_target_latin: correctedTargetLatin,
              verification_status: 'TEACHER_REVIEWED',
              contributor_id: userId
            });
          }
        }
      } else if (item.entityType === 'STUDENT_PROGRESS') {
        const { studentId, topic, masteryScore, needsRemediation } = item.payload;
        db.upsert('student_progress', {
          studentId,
          topic,
          masteryScore,
          needsRemediation,
          updatedAt: item.clientTimestamp
        }, p => p.studentId === studentId && p.topic === topic);
      }

      acknowledgedIds.push(item.clientActionId);
    } catch (err: any) {
      console.error('Failed to sync item:', item, err);
    }
  }

  res.json({
    success: true,
    processedCount: acknowledgedIds.length,
    acknowledgedIds,
    conflicts,
    syncedAt: new Date().toISOString()
  });
};

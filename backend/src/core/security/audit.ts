import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/db';

export interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  resource: string;
  details: Record<string, any>;
  ipAddress?: string;
  timestamp: string;
}

export const recordAuditLog = (
  userId: string,
  action: string,
  resource: string,
  details: Record<string, any>,
  ipAddress?: string
): AuditLogEntry => {
  const entry: AuditLogEntry = {
    id: uuidv4(),
    userId,
    action,
    resource,
    details,
    ipAddress,
    timestamp: new Date().toISOString()
  };

  db.insert('audit_logs', entry);
  return entry;
};

import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface DatabaseStore {
  schools: any[];
  users: any[];
  classes: any[];
  students: any[];
  curriculum: any[];
  language_terms: any[];
  translations: any[];
  lessons: any[];
  worksheets: any[];
  flashcards: any[];
  assessments: any[];
  student_progress: any[];
  content_packs: any[];
  sync_queue: any[];
  ai_sessions: any[];
  analytics_events: any[];
  audit_logs: any[];
  attendance: any[];
  mdm_slips: any[];
}

const defaultTables: DatabaseStore = {
  schools: [],
  users: [],
  classes: [],
  students: [],
  curriculum: [],
  language_terms: [],
  translations: [],
  lessons: [],
  worksheets: [],
  flashcards: [],
  assessments: [],
  student_progress: [],
  content_packs: [],
  sync_queue: [],
  ai_sessions: [],
  analytics_events: [],
  audit_logs: [],
  attendance: [],
  mdm_slips: []
};

export class DatabaseAdapter {
  private filePath: string;
  private data: DatabaseStore;
  private saveTimeout: NodeJS.Timeout | null = null;

  constructor(filePath?: string) {
    this.filePath = filePath || path.resolve(__dirname, '../../../data/palash_mitra.json');
    this.data = { ...defaultTables };
    this.init();
  }

  private init() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(this.filePath)) {
      try {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        this.data = { ...defaultTables, ...parsed };

        // Zero Mock Data Policy: Purge any legacy seeded fake students or test attendance
        if (Array.isArray(this.data.students) && this.data.students.some((s: any) => s.name && (s.name.includes('Birsa') || s.name.includes('Sombari') || s.name.includes('Shanti')))) {
          this.data.students = [];
          this.data.attendance = [];
          this.data.student_progress = [];
          this.data.classes = [];
          // Keep only admin users, teachers will be added manually by user
          this.data.users = (this.data.users || []).filter((u: any) => u.role === 'SCHOOL_ADMIN' || u.role === 'DISTRICT_ADMIN');
          this.persistImmediate();
        }
      } catch (err) {
        console.warn('Could not parse existing DB file, reinitializing with defaults:', err);
        this.data = { ...defaultTables };
        this.persistImmediate();
      }
    } else {
      this.persistImmediate();
    }
  }

  public persistImmediate() {
    try {
      const tempPath = `${this.filePath}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tempPath, this.filePath);
    } catch (err) {
      console.error('Failed to write database file:', err);
    }
  }

  public schedulePersist() {
    if (this.saveTimeout) return;
    this.saveTimeout = setTimeout(() => {
      this.saveTimeout = null;
      this.persistImmediate();
    }, 150);
  }

  public find<T = any>(table: keyof DatabaseStore, predicate?: (item: T) => boolean): T[] {
    const list = (this.data[table] || []) as T[];
    if (!predicate) return [...list];
    return list.filter(predicate);
  }

  public findOne<T = any>(table: keyof DatabaseStore, predicate: (item: T) => boolean): T | null {
    const list = (this.data[table] || []) as T[];
    const item = list.find(predicate);
    return item ? { ...item } : null;
  }

  public insert<T extends { id?: string }>(table: keyof DatabaseStore, item: T): T {
    if (!this.data[table]) {
      this.data[table] = [];
    }
    const withId = {
      ...item,
      id: item.id || uuidv4(),
      createdAt: (item as any).createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data[table].push(withId);
    this.schedulePersist();
    return withId as T;
  }

  public insertMany<T extends { id?: string }>(table: keyof DatabaseStore, items: T[]): T[] {
    if (!this.data[table]) {
      this.data[table] = [];
    }
    const result = items.map(item => ({
      ...item,
      id: item.id || uuidv4(),
      createdAt: (item as any).createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    this.data[table].push(...result);
    this.schedulePersist();
    return result as T[];
  }

  public update<T extends { id: string }>(
    table: keyof DatabaseStore,
    id: string,
    updates: Partial<T>
  ): T | null {
    const list = this.data[table] as any[];
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;

    const updated = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    list[index] = updated;
    this.schedulePersist();
    return updated as T;
  }

  public upsert<T extends { id: string }>(
    table: keyof DatabaseStore,
    item: T,
    matchFn: (existing: T) => boolean
  ): T {
    const list = this.data[table] as any[];
    const index = list.findIndex(matchFn);
    if (index >= 0) {
      const updated = {
        ...list[index],
        ...item,
        updatedAt: new Date().toISOString()
      };
      list[index] = updated;
      this.schedulePersist();
      return updated as T;
    } else {
      return this.insert(table, item);
    }
  }

  public delete(table: keyof DatabaseStore, id: string): boolean {
    const list = this.data[table] as any[];
    const initialLen = list.length;
    this.data[table] = list.filter(item => item.id !== id);
    if (this.data[table].length !== initialLen) {
      this.schedulePersist();
      return true;
    }
    return false;
  }

  public count(table: keyof DatabaseStore, predicate?: (item: any) => boolean): number {
    const list = this.data[table] || [];
    if (!predicate) return list.length;
    return list.filter(predicate).length;
  }

  public clear(table: keyof DatabaseStore): void {
    this.data[table] = [];
    this.schedulePersist();
  }

  public resetApplicationData(): void {
    this.data.students = [];
    this.data.attendance = [];
    this.data.student_progress = [];
    this.data.classes = [];
    this.data.assessments = [];
    this.data.worksheets = [];
    this.data.flashcards = [];
    this.data.sync_queue = [];
    this.data.ai_sessions = [];
    this.data.analytics_events = [];
    this.data.audit_logs = [];
    // Reset teachers to clean empty state (teachers will be added manually)
    this.data.users = this.data.users ? this.data.users.filter((u: any) => u.role === 'SCHOOL_ADMIN' || u.role === 'DISTRICT_ADMIN') : [];
    this.persistImmediate();
  }
}

export const db = new DatabaseAdapter();

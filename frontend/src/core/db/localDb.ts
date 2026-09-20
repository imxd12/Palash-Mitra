// IndexedDB client for Offline-First Storage in Palash Mitra
const DB_NAME = 'palash_mitra_offline_db';
const DB_VERSION = 1;

export interface OfflinePack {
  id: string;
  languageCode: string;
  grade: number;
  version: string;
  checksum: string;
  downloadedAt: string;
  data: any;
}

export interface OfflineSyncAction {
  id: string;
  entityType: 'TEACHER_CORRECTION' | 'STUDENT_PROGRESS' | 'ASSESSMENT_RESULT' | 'FEEDBACK';
  action: 'INSERT' | 'UPDATE';
  payload: any;
  clientTimestamp: string;
  synced: boolean;
}

class LocalDatabase {
  private dbPromise: Promise<IDBDatabase>;

  constructor() {
    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        console.warn('IndexedDB is not supported in this environment.');
        return;
      }
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e: any) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('content_packs')) {
          db.createObjectStore('content_packs', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('terms_memory')) {
          const store = db.createObjectStore('terms_memory', { keyPath: 'id', autoIncrement: true });
          store.createIndex('hindi', 'hindi', { unique: false });
        }
        if (!db.objectStoreNames.contains('cached_lessons')) {
          db.createObjectStore('cached_lessons', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('sync_queue')) {
          db.createObjectStore('sync_queue', { keyPath: 'id' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  public async savePack(pack: OfflinePack): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction('content_packs', 'readwrite');
      tx.objectStore('content_packs').put(pack);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  public async getPacks(): Promise<OfflinePack[]> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction('content_packs', 'readonly');
      const req = tx.objectStore('content_packs').getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  public async getPackByGrade(grade: number, lang = 'sat'): Promise<OfflinePack | null> {
    const packs = await this.getPacks();
    return packs.find(p => p.grade === grade && p.languageCode === lang) || null;
  }

  public async addToSyncQueue(item: Omit<OfflineSyncAction, 'id' | 'synced'>): Promise<string> {
    const db = await this.dbPromise;
    const id = `action_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const fullItem: OfflineSyncAction = { ...item, id, synced: false };

    return new Promise((resolve, reject) => {
      const tx = db.transaction('sync_queue', 'readwrite');
      tx.objectStore('sync_queue').put(fullItem);
      tx.oncomplete = () => resolve(id);
      tx.onerror = () => reject(tx.error);
    });
  }

  public async getPendingSyncItems(): Promise<OfflineSyncAction[]> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction('sync_queue', 'readonly');
      const req = tx.objectStore('sync_queue').getAll();
      req.onsuccess = () => {
        const list: OfflineSyncAction[] = req.result || [];
        resolve(list.filter(i => !i.synced));
      };
      req.onerror = () => reject(tx.error);
    });
  }

  public async markSyncCompleted(ids: string[]): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction('sync_queue', 'readwrite');
      const store = tx.objectStore('sync_queue');
      for (const id of ids) {
        store.delete(id);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  public async cacheLesson(lesson: any): Promise<void> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction('cached_lessons', 'readwrite');
      tx.objectStore('cached_lessons').put(lesson);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  public async getCachedLessons(): Promise<any[]> {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction('cached_lessons', 'readonly');
      const req = tx.objectStore('cached_lessons').getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(tx.error);
    });
  }

  public async clearAll(): Promise<void> {
    const db = await this.dbPromise;
    const stores = ['content_packs', 'terms_memory', 'cached_lessons', 'sync_queue'];
    return new Promise((resolve, reject) => {
      const tx = db.transaction(stores, 'readwrite');
      stores.forEach(s => tx.objectStore(s).clear());
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }
}

export const localDb = new LocalDatabase();

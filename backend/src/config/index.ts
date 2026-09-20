import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'palash_mitra_sih_secure_jwt_secret_2026_jharkhand',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  dbType: process.env.DB_TYPE || 'sqlite',
  dbFile: process.env.DB_FILE || path.resolve(__dirname, '../../data/palash_mitra.json'),
  databaseUrl: process.env.DATABASE_URL || '',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  bhashiniApiKey: process.env.BHASHINI_API_KEY || '',
  bhashiniUserId: process.env.BHASHINI_USER_ID || '',
  contentPackDir: process.env.CONTENT_PACK_DIR || path.resolve(__dirname, '../../data/packs'),
  offlineCacheMaxAgeDays: parseInt(process.env.OFFLINE_CACHE_MAX_AGE_DAYS || '30', 10),
};

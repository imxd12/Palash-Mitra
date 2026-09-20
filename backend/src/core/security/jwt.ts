import jwt from 'jsonwebtoken';
import { config } from '../../config';

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'TEACHER' | 'SCHOOL_ADMIN' | 'DISTRICT_ADMIN' | 'LANGUAGE_EXPERT' | 'SYSTEM_ADMIN';
  schoolId?: string;
  name: string;
}

export const signToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn as any });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.jwtSecret) as TokenPayload;
};

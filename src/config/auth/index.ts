import { registerAs } from '@nestjs/config';

export const JWT_CONFIG = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: '60m',
}));
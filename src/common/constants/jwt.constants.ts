
export const JWT = {
  secret: process.env.JWT_SECRET || 'defaultSecret',
  expiresIn: '60m',
};

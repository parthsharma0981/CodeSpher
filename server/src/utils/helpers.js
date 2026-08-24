import crypto from 'crypto';

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateInviteCode = () => {
  return crypto.randomBytes(4).toString('hex').toUpperCase();
};

export const paginate = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

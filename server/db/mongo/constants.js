export const dbHost = process.env.MONGOHQ_HOST || process.env.MONGODB_HOST || 'localhost';
export const dbPort = process.env.MONGOHQ_PORT || process.env.MONGODB_PORT || '27017';
export const dbUser = process.env.MONGOHQ_USER || process.env.MONGODB_USER || null;
export const dbPass = process.env.MONGOHQ_PASS || process.env.MONGODB_PASS || null;
export const dbName = process.env.MONGOHQ_NAME || process.env.MONGODB_NAME ||
  (process.env.NODE_ENV === 'production' ? 'EconomicData' : 'EconomicData_Dev');
export const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI ||
  `mongodb://${dbUser ? `${dbUser}:${dbPass}@` : ''}${dbHost}${dbPort ? `:${dbPort}` : ''}/${dbName}`;

export default {
  dbHost,
  dbPort,
  dbUser,
  dbPass,
  dbName,
  db
};

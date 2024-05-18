import 'dotenv/config';

export default {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  env: process.env.ENV,
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
};

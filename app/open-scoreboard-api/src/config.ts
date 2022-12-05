import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
});

export default {
  api: {
    port: process.env.PORT,
    root: process.env.API_ROOT,
    useSwagger:
      (process.env.USE_SWAGGER &&
        process.env.USE_SWAGGER.toLowerCase() === 'true') ||
      false,
    useCompression:
      (process.env.USE_COMPRESSION &&
        process.env.USE_COMPRESSION.toLowerCase() === 'true') ||
      false,
  },

  frontEnd: {
    domain: process.env.FRONTEND_DOMAIN,
  },
  auth: {
    jwt: {
      accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'ChangeMe!',
      refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'ChangeMeToo!',
      accessTokenLife: 3600,
      refreshTokenLife: 2592000,
    },
    resetPassword: {
      secret: process.env.PASSWORD_TOKEN_SECRET,
      ttl: 86400000, // 1 day
      algorithm: 'aes256',
      inputEncoding: 'utf8',
      outputEncoding: 'hex',
    },
  },

  db: {
    url: process.env.MONGO_DB_URL,
    name: process.env.MONGO_DB_NAME,
  },

  logger: {
    console: {
      level: process.env.LOGGER_LEVEL || 'debug',
    },
    file: {
      logDir: process.env.LOGGER_DIR || 'logs',
      logFile: process.env.LOGGER_FILE || 'bundle_node.log',
      level: (process.env.LOGGER_LEVEL as any) || ('debug' as any),
      maxsize: process.env.LOGGER_MAX_SIZE
        ? parseInt(process.env.LOGGER_MAX_SIZE, 10)
        : 1024 * 1024 * 10, // 10MB
      maxFiles: process.env.LOGGER_MAX_FILES
        ? parseInt(process.env.LOGGER_MAX_FILES, 10)
        : 5,
    },
  },
};

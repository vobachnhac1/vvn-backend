export const config = {
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expiresIn: '1y'
  },

  auth: {
    username: process.env.SECURITY_USERNAME,
    password: process.env.SECURITY_PASSWORD
  },

  backup: {
    statsFile: process.env.BACKUP_STATS_FILE,
    paths: {
      backupLocation: process.env.PATHS_BACKUP_STORAGE_LOCATION,
      mrpStaticResources: process.env.PATHS_MRP_STATIC_RESOURCE,
      mrpLogLocation: process.env.PATHS_MRP_LOG_LOCATION
    },
    database: {
      host: process.env.BACKUP_DB_HOST,
      port: process.env.BACKUP_DB_PORT || 5432,
      dbName: process.env.BACKUP_DB_NAME,
      user: process.env.BACKUP_DB_USER
    }
  }
};

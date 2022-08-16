export const config = {
  jwt: {
    secretKey: '',
    expiresIn: '1d',
  },

  auth: {
    username: '',
    password: '',
  },

  backup: {
    statsFile: '',
    database: {
      host: '',
      port: 5432,
      user: '',
      dbName: '',
    },
    paths: {
      backupLocation: '',
      mrpStaticResources: '',
      mrpLogLocation: '',
    },
  },
};

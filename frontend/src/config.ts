export interface ServerConfig {
  APP_REVALIDATE: number;
  APP_STORAGE: string;

  MONGO_URI: string;
  MONGO_DB_NAME: string;

  GOOGLE_API_KEY: string;
  GOOGLE_SPREADSHEET_ID_CONTENTS: string;
}

export function getConfig(): ServerConfig {
  return {
    APP_REVALIDATE: process.env.APP_REVALIDATE ? parseInt(process.env.APP_REVALIDATE) : 7200,
    APP_STORAGE: process.env.APP_STORAGE || 'storage',

    MONGO_URI: process.env.MONGO_URI || '',
    MONGO_DB_NAME: 'madabclick',

    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
    GOOGLE_SPREADSHEET_ID_CONTENTS: process.env.GOOGLE_SPREADSHEET_ID_CONTENTS || '',
  };
}

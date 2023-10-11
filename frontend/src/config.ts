export interface ClientConfig {
  FRONTEND_PORT: number;
  FRONTEND_HOST: string;
  FRONTEND_URL: string;

  APP_REVALIDATE: number;

  GOOGLE_API_KEY: string;
  GOOGLE_SPREADSHEET_ID_CONTENTS: string;
}

export const config: ClientConfig = {
  FRONTEND_PORT: process.env.FRONTEND_PORT ? parseInt(process.env.FRONTEND_PORT) : 8000,
  FRONTEND_HOST: process.env.FRONTEND_HOST || '',
  FRONTEND_URL: process.env.FRONTEND_URL || '',

  APP_REVALIDATE: process.env.APP_REVALIDATE ? parseInt(process.env.APP_REVALIDATE) : 7200,

  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
  GOOGLE_SPREADSHEET_ID_CONTENTS: process.env.GOOGLE_SPREADSHEET_ID_CONTENTS || '',
};

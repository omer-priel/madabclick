export interface ClientConfig {
  FRONTEND_URL: string;

  APP_REVALIDATE: number;

  GOOGLE_API_KEY: string;
  GOOGLE_SPREADSHEET_ID_CONTENTS: string;
}

export const config: ClientConfig = {
  FRONTEND_URL: process.env.FRONTEND_URL || '',

  APP_REVALIDATE: process.env.APP_REVALIDATE ? parseInt(process.env.APP_REVALIDATE) : 7200,

  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
  GOOGLE_SPREADSHEET_ID_CONTENTS: process.env.GOOGLE_SPREADSHEET_ID_CONTENTS || '',
};

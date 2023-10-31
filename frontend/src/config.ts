export interface ServerConfig {
  APP_REVALIDATE: number;

  GOOGLE_API_KEY: string;
  GOOGLE_SPREADSHEET_ID_CONTENTS: string;
}

export const config: ServerConfig = {
  APP_REVALIDATE: process.env.APP_REVALIDATE ? parseInt(process.env.APP_REVALIDATE) : 7200,

  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
  GOOGLE_SPREADSHEET_ID_CONTENTS: process.env.GOOGLE_SPREADSHEET_ID_CONTENTS || '',
};

export interface ServerConfig {
  APP_REVALIDATE: number;

  DYNAMO_END_POINT: string;

  GOOGLE_API_KEY: string;
  GOOGLE_SPREADSHEET_ID_CONTENTS: string;
}

export function getConfig(): ServerConfig {
  return {
    APP_REVALIDATE: process.env.APP_REVALIDATE ? parseInt(process.env.APP_REVALIDATE) : 7200,

    DYNAMO_END_POINT: process.env.DYNAMO_END_POINT || '',

    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
    GOOGLE_SPREADSHEET_ID_CONTENTS: process.env.GOOGLE_SPREADSHEET_ID_CONTENTS || '',
  };
}

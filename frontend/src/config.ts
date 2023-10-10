export interface ClientConfig {
  FRONTEND_PORT: number;
  FRONTEND_HOST: string;
  FRONTEND_URL: string;
}

export const config: ClientConfig = {
  FRONTEND_PORT: process.env.FRONTEND_PORT ? parseInt(process.env.FRONTEND_PORT) : 3000,
  FRONTEND_HOST: process.env.FRONTEND_HOST || '',
  FRONTEND_URL: process.env.FRONTEND_URL || '',
};

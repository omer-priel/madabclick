export interface APIKeyPermissions {
  logs_create: boolean;
  logs_manage: boolean;
  api_keys_manage: boolean;
}

export interface APIKey {
  api_key: string;
  updated_at: string;
  permissions: APIKeyPermissions;
}

export interface LogLevel {
  name: string;
  level: number;
  disabled: boolean;
}

export interface Logs {
  order_by: 'logger' | 'created_at' | 'local_created_at';
  order_direction: 'asc' | 'desc';
  offset: number;
  limit: number;
  logs: LogRecord[];
  last_offset: number;
}

export interface LogRecord {
  level: string;
  logger: string;
  message: string;
  payload: string | null;
  created_at: string;
  local_created_at: string | null;
}

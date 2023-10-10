import { ClientConfig } from '@/config';

export function apiGet(config: ClientConfig, clientApiKey: string, subUrl: string) {
  const init: RequestInit = {
    method: 'GET',
    headers: {
      'api-key': clientApiKey,
    },
  };

  return fetch(config.OPENLOG_API_URL + subUrl, init);
}

export function apiPost(config: ClientConfig, clientApiKey: string, subUrl: string, body: unknown) {
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'api-key': clientApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  return fetch(config.OPENLOG_API_URL + subUrl, init);
}

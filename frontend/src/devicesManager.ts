export type Device = 'desktop' | 'mobile' | 'googlebot' | 'whatsapp' | 'twitterbot';

interface GStore {
  device: Device;
}

const gStore: GStore = {
  device: 'desktop',
};

export function findDevice(userAgent: string | null): Device {
  if (!userAgent) {
    return 'desktop';
  }

  if (userAgent.includes('Googlebot')) {
    return 'googlebot';
  }

  if (userAgent.includes('WhatsApp')) {
    return 'whatsapp';
  }

  if (userAgent.includes('Twitterbot')) {
    return 'twitterbot';
  }

  if (userAgent.includes('Android') || userAgent.includes('iOS') || userAgent.includes('Mobile')) {
    return 'mobile';
  }

  return 'desktop';
}

export function setDevice(device: Device): void {
  gStore.device = device;
}

export function getDevice(): Device {
  return gStore.device;
}

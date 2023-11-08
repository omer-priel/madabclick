export type Device = 'desktop' | 'mobile' | 'googlebot' | 'whatsapp' | 'twitterbot';

interface GStore {
  device: Device;
}

const gStore: GStore = {
  device: 'desktop',
};

export function findDevice(userAgent: string | null): Device {
  let device: Device = 'desktop';

  if (userAgent) {
    if (userAgent.includes('WhatsApp')) {
      device = 'whatsapp';
    } else if (userAgent.includes('Android') || userAgent.includes('iOS') || userAgent.includes('Mobile')) {
      device = 'mobile';
    } else if (userAgent.includes('Googlebot')) {
      device = 'googlebot';
    }
  }

  return device;
}

export function setDevice(device: Device): void {
  gStore.device = device;
}

export function getDevice(): Device {
  return gStore.device;
}

import { prettifyString } from '@/utils/strings';

export function sanitizeBase64(str: string): string {
  return str.replace(/"+/g, '');
}

export function isBase64(str: string): boolean {
  if (!str || typeof str !== 'string') return false;

  const sanitized = sanitizeBase64(str);

  const base64Regex =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

  return base64Regex.test(sanitized);
}

function base64ToUint8Array(base64: string) {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

export async function decodeBase64(value: string) {
  if (!isBase64(value)) return value;

  try {
    const pako = await import('pako');
    const decodedValue = pako.ungzip(base64ToUint8Array(value), {
      to: 'string',
    });

    return prettifyString(decodedValue);
  } catch {
    return value;
  }
}

self.onmessage = async function (event) {
  const decoded = await decodeBase64(event.data);

  self.postMessage(decoded);
};

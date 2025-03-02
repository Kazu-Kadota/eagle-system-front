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

import { prettifyString } from 'src/utils/pretty'

export function sanitizeBase64(str: string): string {
  return str.replace(/"+/g, '')
}

export function isBase64(str: string): boolean {
  if (!str || typeof str !== 'string') return false

  const sanitized = sanitizeBase64(str)

  const base64Regex =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

  return base64Regex.test(sanitized)
}

export async function gunzipBase64(
  str: string,
  { prettify = false } = {},
): Promise<string> {
  const pako = await import('pako')
  const compressedData = Uint8Array.from(atob(str), (c) => c.charCodeAt(0))
  const decompressedData = pako.ungzip(compressedData, { to: 'string' })

  if (prettify) {
    return prettifyString(decompressedData)
  }

  return decompressedData
}

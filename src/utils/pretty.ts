export function prettifyString(str: string): string {
  try {
    const json = JSON.parse(str)
    return JSON.stringify(json, null, 2)
  } catch (error) {
    return str
  }
}

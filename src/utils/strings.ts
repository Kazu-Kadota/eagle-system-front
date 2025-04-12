export function prettifyString(str: string): string {
  try {
    const parsedValue = JSON.parse(str);

    if (typeof parsedValue === 'string') {
      return parsedValue;
    }

    return JSON.stringify(parsedValue, null, 2);
  } catch {
    return str;
  }
}

export function capitalize(text: string): string {
  if (!text) {
    return text;
  }
  if (text.length === 1) {
    return text.toLocaleUpperCase();
  }
  return text.substring(0, 1).toLocaleUpperCase() + text.substring(1);
}
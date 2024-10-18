export function isBoolean(str: string): boolean | null {
  const boolMap: Record<string, boolean> = {
    true: true,
    false: false,
    yes: true,
    no: false,
    1: true,
    0: false,
  };

  return boolMap[str.toLowerCase()] ?? null;
}
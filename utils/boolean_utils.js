export function isBoolean(str) {
  const boolMap = {
    true: true,
    false: false,
    yes: true,
    no: false,
    1: true,
    0: false,
  };

  return boolMap[str.toLowerCase()] ?? null;
}

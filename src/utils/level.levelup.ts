
export function hasLeveledUp(
  xp: bigint,
  currentLevel: number,
  base = 100
): boolean {
  const xpForNextLevel = base * currentLevel ** 2;
  return xp >= xpForNextLevel;
}

export function xpForLevel(
  level: number,
  base = 100
): bigint {
  if (level <= 1) return 0n;
  const n = BigInt(level - 1);
  return BigInt(base) * (n * n);
}

function isqrt(value: bigint): bigint {
  if (value < 0n) throw new Error('isqrt of negative');
  if (value < 2n) return value;
  let low = 1n;
  let high = value;
  while (high - low > 1n) {
    const mid = (low + high) >> 1n;
    if (mid * mid > value) {
      high = mid;
    } else {
      low = mid;
    }
  }
  return low;
}

export function levelFromXp(
  xp: bigint,
  base = 100
): number {
  if (xp < 0n) return 1;
  const b = BigInt(base);
  const normalized = xp / b;
  const nMinus1 = isqrt(normalized);
  return Number(nMinus1 + 1n);
}


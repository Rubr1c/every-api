/**
 * @module utils/levels
 *
 * Utilities for calculating experience (XP) thresholds
 * and mapping XP values to levels in a quadratic progression.
 *
 * Exports:
 *  - hasLeveledUp(xp, currentLevel, base)
 *  - xpForLevel(level, base)
 *  - levelFromXp(xp, base)
 *
 * Assumes `base` XP for level 2, with XP-to-level scaling of base × (n – 1)².
 *
 * @author Ali Zaghloul
 * @license MIT
 */


/**
 * Determines whether a user with `xp` has reached the next level.
 *
 * @param xp
 *   Current experience points (bigint).
 * @param currentLevel
 *   The user’s current level (number).
 * @param base
 *   Base XP required for level 2 (defaults to 100).
 * @returns
 *   `true` if xp ≥ base × (currentLevel)² (i.e. threshold for next level), else `false`.
 */
export function hasLeveledUp(
  xp: bigint,
  currentLevel: number,
  base = 100
): boolean {
  const xpForNextLevel = base * currentLevel ** 2;
  return xp >= xpForNextLevel;
}

/**
 * Computes the total XP required to reach a given level.
 *
 * @param level
 *   Target level (number).  Minimum meaningful level is 2.
 * @param base
 *   Base XP for level 2 (defaults to 100).
 * @returns
 *   XP (bigint) required to reach `level`. Returns 0n for level ≤ 1.
 */
export function xpForLevel(
  level: number,
  base = 100
): bigint {
  if (level <= 1) return 0n;
  const n = BigInt(level - 1);
  return BigInt(base) * (n * n);
}

/**
 * Integer square root of a bigint: the largest integer ≤ √value.
 *
 * @param value
 *   A non-negative bigint.
 * @throws
 *   Error if `value` is negative.
 * @internal
 */
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

/**
 * Calculates the level corresponding to a given XP amount.
 *
 * Inverts the quadratic XP curve: level = ⌊√(xp/base)⌋ + 1.
 *
 * @param xp
 *   Current experience points (bigint).
 * @param base
 *   Base XP for level 2 (defaults to 100).
 * @returns
 *   The computed level (number), minimum 1.
 */
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


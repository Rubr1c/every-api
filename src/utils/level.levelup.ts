
export function hasLeveledUp(
  xp: bigint,
  currentLevel: number,
  base = 100
): boolean {
  const xpForNextLevel = base * currentLevel ** 2;
  return xp >= xpForNextLevel;
}

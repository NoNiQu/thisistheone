export function calculateDamage(attackerAtk: number, defenderDef: number): number {
  return Math.max(attackerAtk - defenderDef, 1);
}

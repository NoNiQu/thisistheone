import BattleButton from "./battleButton";

type BattleControlsProps = {
  onAttack: () => void;
  onDefend: () => void;
  disabled: boolean;
};

export default function BattleControls({
  onAttack,
  onDefend,
  disabled,
}: BattleControlsProps) {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      <BattleButton label="Attack" onClick={onAttack} disabled={disabled} />
      <BattleButton label="Defend" onClick={onDefend} disabled={disabled} />
      <BattleButton label="Ability" onClick={() => {}} disabled={true} />
      <BattleButton label="Item" onClick={() => {}} disabled={true} />
    </div>
  );
}

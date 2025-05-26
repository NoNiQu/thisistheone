import BattleButton from "../components/battleButton";

export default function BattleControls() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-md">
      <BattleButton label="Attack" onClick={() => {}} />
      <BattleButton label="Defend" onClick={() => {}} />
      <BattleButton label="Ability" onClick={() => {}} />
      <BattleButton label="Item" onClick={() => {}} />
    </div>
  );
}

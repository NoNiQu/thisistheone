import BattleButton from "../components/battleButton";

export default function BattleControls() {
  return (
    <div className="flex justify-center gap-4 w-full max-w-5xl flex-wrap">
      <BattleButton label="Attack" onClick={() => {}} />
      <BattleButton label="Defend" onClick={() => {}} />
      <BattleButton label="Ability" onClick={() => {}} />
      <BattleButton label="Item" onClick={() => {}} />
    </div>
  );
}

import BattleStat from "../components/battleStats";

type CharacterProps = {
  name: string;
  sprite: string;
  health: number;
  stamina?: number;
  flipped?: boolean;
};

export default function Character({
  name,
  sprite,
  health,
  stamina,
  flipped,
}: CharacterProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-6 mb-4">
        <BattleStat icon="/icons/heart-solid.svg" value={health} />
        {stamina !== undefined && (
          <BattleStat icon="/icons/bolt-solid.svg" value={stamina} />
        )}
      </div>

      <img
        src={sprite}
        alt={name}
        className={`w-80 h-auto ${flipped ? "scale-x-[-1]" : ""}`}
      />
    </div>
  );
}

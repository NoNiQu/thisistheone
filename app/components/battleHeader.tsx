import TextInformation from "../components/textInformation";

type BattleHeaderProps = {
  turn: number;
  stage: number;
  combat: number;
};

export default function BattleHeader({
  turn,
  stage,
  combat,
}: BattleHeaderProps) {
  return (
    <div className="relative flex justify-between items-center w-full px-8 md:px-16 py-4 text-white text-base md:text-lg uppercase font-bold">
      <span>Turn: {turn}</span>

      <TextInformation
        text="WORK IN PROGRESS"
        position="top-0 left-1/2 transform -translate-x-1/2"
      />

      <span>
        Room: {stage} - {combat}
      </span>
    </div>
  );
}

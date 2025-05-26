type BattleStatProps = {
  icon: string;
  value: number | string;
};

export default function BattleStat({ icon, value }: BattleStatProps) {
  return (
    <div className="flex items-center gap-1 text-white text-xl">
      <img src={icon} alt="icon" className="w-6 h-6" />
      <span className="font-bold">{value}</span>
    </div>
  );
}

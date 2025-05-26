type BattleButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function BattleButton({
  label,
  onClick,
  disabled,
}: BattleButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-[#1B263B] text-white text-md md:text-xl px-6 py-3 m-1 rounded-md 
        uppercase tracking-widest border-4 border-[#4C2A85] hover:bg-[#3A1F63] 
        active:translate-y-[2px] disabled:opacity-50 hover:cursor-pointer"
    >
      {label}
    </button>
  );
}

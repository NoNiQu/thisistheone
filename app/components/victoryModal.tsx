// components/VictoryModal.tsx

type VictoryModalProps = {
  enemyName: string;
  onNext: () => void;
};

export default function VictoryModal({ enemyName, onNext }: VictoryModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-xl max-w-md w-full text-center border-4 border-yellow-400 pixel-font shadow-2xl">
        <h2 className="text-4xl font-bold mb-4">YOU WIN!</h2>
        <p className="text-xl mb-6">
          You defeated <strong>{enemyName}</strong>!
        </p>
        <button
          onClick={onNext}
          className="bg-yellow-400 text-black px-6 py-3 rounded uppercase font-bold text-lg hover:bg-yellow-500 transition-all"
        >
          Next Battle
        </button>
      </div>
    </div>
  );
}

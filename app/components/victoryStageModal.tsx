type VictoryStageModalProps = {
  onContinue: () => void;
};

export default function VictoryStageModal({
  onContinue,
}: VictoryStageModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-xl max-w-md w-full text-center border-4 border-green-500 pixel-font shadow-2xl">
        <h2 className="text-4xl font-bold mb-4">Stage Completed!</h2>
        <p className="text-xl mb-6">You defeated all enemies!</p>
        <button
          onClick={onContinue}
          className="bg-green-500 text-black px-6 py-3 rounded uppercase font-bold text-lg hover:bg-green-600 transition-all"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

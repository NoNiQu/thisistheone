type DefeatModalProps = {
  onRestart: () => void;
};

export default function DefeatModal({ onRestart }: DefeatModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-xl max-w-md w-full text-center border-4 border-red-500 pixel-font shadow-2xl">
        <h2 className="text-4xl font-bold mb-4">Has muerto...</h2>
        <p className="text-xl mb-6">
          El enemigo te ha vencido. ¡Inténtalo de nuevo!
        </p>
        <button
          onClick={onRestart}
          className="bg-red-500 text-black px-6 py-3 rounded uppercase font-bold text-lg hover:bg-red-600 transition-all"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

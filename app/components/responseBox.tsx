export default function ResponseBox({ text }: { text: string }) {
  return (
    <div className="bg-white text-black text-center font-bold text-xl py-4 px-6 rounded-xl w-full max-w-xl pixel-font">
      {text}
    </div>
  );
}

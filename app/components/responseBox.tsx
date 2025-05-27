export default function ResponseBox({ text }: { text: string }) {
  return (
    <div className="bg-white text-black text-center font-bold text-xl px-20 py-10 rounded-xl w-full max-w-3xl">
      {text}
    </div>
  );
}

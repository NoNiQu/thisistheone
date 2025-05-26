type TextInfoProps = {
  text: string;
  position?: string;
};

function TextInformation({ text, position = "top-4 right-4" }: TextInfoProps) {
  return (
    <div
      className={`absolute ${position} text-white text-xl 
        bg-black opacity-60 rounded px-5 py-3`}
    >
      {text}
    </div>
  );
}

export default TextInformation;

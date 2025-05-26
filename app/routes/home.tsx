import Title from "../components/title";
import Button from "../components/button";
import TextInformation from "../components/textInformation";
import Footer from "../components/footer";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center bg-black overflow-hidden">
      <img
        src="/fondo.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <TextInformation text="WORK IN PROGRESS" position="top-10 right-10" />

      <div className="z-10 text-center px-4">
        <Title />
      </div>

      <Footer />
    </main>
  );
}

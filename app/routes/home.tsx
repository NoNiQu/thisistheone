import { useEffect, useState } from "react";
import Title from "../components/title";
import TextInformation from "../components/textInformation";
import Footer from "../components/footer";
import MobileWarning from "../components/mobileWarning";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return <MobileWarning />;

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

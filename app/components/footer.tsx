function Footer() {
  return (
    <footer className="w-full absolute bottom-0 left-0 right-0 text-white text-xs md:text-sm bg-transparent z-10">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <img
            src="/logos/LOGOb.png"
            alt="Logo empresa"
            className="w-50 h-25 ml-5"
          />
        </div>
        <span className="opacity-60 mr-5 self-end">Alpha 0.01</span>
      </div>

      <div className="bg-black/50 w-full">
        <div className="flex justify-between items-center px-3 py-3">
          <div className="flex items-center gap-2">
            <img
              src="/icons/kickstarter-brands.svg"
              alt="Kickstarter"
              className="w-10 h-10 ml-3"
            />
            <span className="uppercase text-white ml-3">
              Colaborate with the Kickstarter
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="uppercase text-white">Join us:</span>
            <img
              src="/icons/square-x-twitter-brands.svg"
              alt="X/Twitter"
              className="w-10 h-10 mx-3"
            />
            <img
              src="/icons/discord-brands.svg"
              alt="Discord"
              className="w-10 h-10 mr-3"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

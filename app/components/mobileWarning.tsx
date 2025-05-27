export default function MobileWarning() {
  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-center bg-[#1B263B] text-white text-center px-6"
      style={{ zIndex: 9999 }}
    >
      <h1 className="text-2xl font-bold mb-4">
        This application is not available on mobile devices
      </h1>
      <p className="text-sm">
        Please use a desktop or laptop to access the full experience.
      </p>
    </div>
  );
}

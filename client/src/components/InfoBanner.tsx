const InfoBanner = ({ message }: { message: string }) => {
  return (
    <div
      className={`bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 fixed bottom-4 right-full ${
        message ? "animate-slideIn" : "opacity-0"
      } transition-opacity duration-500`}
      role="alert"
    >
      <p className="font-bold">{message}</p>
    </div>
  );
};

export default InfoBanner;

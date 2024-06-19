const Alert = ({ message }: { message: string }) => {
  return (
    <div
      className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed bottom-4 right-full ${
        message ? "animate-slideIn" : "opacity-0"
      } transition-opacity duration-500`}
      role="alert"
    >
      <strong className="font-bold">Holy smokes!</strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default Alert;

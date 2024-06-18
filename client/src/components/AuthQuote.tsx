interface AuthQuoteProps {
  title: string;
  quote: string;
}
export const AuthQuote = ({ title, quote }: AuthQuoteProps) => {
  return (
    <div className=" flex flex-col justify-center p-10 bg-slate-800 w-full min-h-screen poppins-regular ">
      <h1 className="text-4xl text-gray-100">{title}</h1>
      <p className="text-white">
        {quote}
        <span className="underline text-blue-300">CampusSwap</span>
      </p>
    </div>
  );
};

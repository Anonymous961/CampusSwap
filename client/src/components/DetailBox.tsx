export default function DetailBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className=" col-span-1 md:col-span-2 lg:col-span-2 flex text-2xl">
      <p className="w-1/2">{label} </p>
      <span className="text-xl lg:col-span-1 w-1/2 text-stone-700 border-2 p-2 border-grey-200 bg-blue-100 rounded-md overflow-x-scroll">
        {value}
      </span>
    </div>
  );
}

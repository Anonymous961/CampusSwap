export default function Admin() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl">Admin page</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4">
        <DetailBlock label={"Number of Users"} value={10} />
        <DetailBlock label={"Number of Items"} value={50} />
        <DetailBlock label={"Number of Rooms"} value={16} />
        <DetailBlock label={"Number of xyz"} value={10} />
      </div>
      <div>
        <h2>Items Listed</h2>
        <p>Items list here</p>
      </div>
    </div>
  );
}

export function DetailBlock({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="p-4 border-2 shadow-md">
      <h1 className="font-semibold">{label}</h1>
      <p className="border-2 border-blue-500 bg-blue-100 rounded-md p-2">
        {value}
      </p>
    </div>
  );
}

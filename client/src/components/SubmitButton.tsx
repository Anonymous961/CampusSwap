interface SubmitButton {
  label: string;
}
export const SubmitButton = ({ label }: SubmitButton) => {
  return (
    <input
      className="border-2 border-gray-400 w-11/12 my-3 mb-4 bg-slate-800 hover:bg-slate-700 hover:rounded-md ease-in duration-300 text-white py-3 px-4"
      type="submit"
      value={label}
    />
  );
};

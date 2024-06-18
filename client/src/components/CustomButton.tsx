import { ReactElement } from "react";

interface CustomButtonType {
  label: ReactElement<string, string> | string;
  onClick: () => void;
  color?: string;
}

export function CustomButton({ label, onClick, color }: CustomButtonType) {
  return (
    <button
      className={`p-6 w-full flex justify-center items-center ${
        color === "yellow" ? "bg-yellow-300" : "bg-slate-800"
      } text-white hover:bg-green-300 rounded-md shadow-md ease-in duration-300`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

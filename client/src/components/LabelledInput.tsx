import { ChangeEvent } from "react";

interface LabelledInputTypes {
  type?: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export function LabelledInput({
  type,
  placeholder,
  onChange,
}: LabelledInputTypes) {
  return (
    <input
      className="border-2 border-gray-500 p-4  my-3 w-11/12"
      type={type || "text"}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

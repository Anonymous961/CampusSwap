import { ChangeEvent } from "react";

interface FilterLabelType {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  checked: boolean;
  name: string;
  label: string;
}

export function FilterLabel({
  onChange,
  id,
  checked,
  name,
  label,
}: FilterLabelType) {
  return (
    <div>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        name={name}
        id={id}
      />
      <label htmlFor="myCity">{label}</label>
    </div>
  );
}

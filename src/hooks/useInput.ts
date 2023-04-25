import { useState, useCallback, ChangeEvent } from "react";

type ReturnType = [
  {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  },
  (value?: string) => void
];

export const useInput = (initialValue: string): ReturnType => {
  const [value, setValue] = useState(initialValue || "");
  return [
    {
      value,
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setValue(e.target.value),
    },
    useCallback((value?: string) => setValue(value || ""), []),
  ];
};

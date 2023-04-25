import { useCallback, useState, ChangeEvent } from "react";

type ReturnType = {
  isChecked: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  handleChange: (value: boolean) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useBoolean = (initial = false): ReturnType => {
  const [isChecked, setIsChecked] = useState(initial);

  const setTrue = useCallback(() => setIsChecked(true), []);
  const setFalse = useCallback(() => setIsChecked(false), []);
  const toggle = useCallback(() => setIsChecked((state) => !state), []);
  const handleChange = useCallback((value: boolean) => setIsChecked(value), []);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.checked);
    },
    [handleChange]
  );

  return { isChecked, setTrue, setFalse, toggle, handleChange, onChange };
};

import React, { FC, MouseEvent, CSSProperties } from "react";

import { ButtonColorType, ButtonVariantType, ButtonColor } from "./constants";

type PropsType = {
  style?: CSSProperties;
  text: string;
  outline?: boolean;
  disabled?: boolean;
  className?: string;
  color: ButtonColorType;
  variant: ButtonVariantType;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const Button: FC<PropsType> = ({
  style,
  text,
  className = "",
  disabled = false,
  color,
  variant,
  onClick,
}: PropsType) => {
  return (
    <button
      style={style}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${ButtonColor[variant][color]} ${
        disabled ? "cursor-not-allowed opacity-80" : "cursor-pointer"
      }  px-4 py-2 rounded ${className}`}
    >
      {text}
    </button>
  );
};

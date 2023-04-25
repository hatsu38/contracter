import React, { FC } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { BiImport } from "react-icons/bi";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";

export const ICONS = [
  "hiOutlineEye",
  "hiOutlineEyeOff",
  "aiOutlinePlus",
  "aiOutlineClose",
  "biImport",
] as const satisfies readonly string[];

export type IconType = (typeof ICONS)[number];
export type IconColorType = `text-${string}-${number}` | "text-white";
export type IconSizeType = `${number}rem`;
export type IconPropsType = {
  icon: IconType;
  className?: string;
  size?: IconSizeType;
  color?: IconColorType;
};

export const Icon: FC<IconPropsType> = ({
  icon,
  size = "2rem",
  className = "",
  color = "text-gray-400",
}: IconPropsType) => {
  const iconProps = {
    className: `${className} ${color}`,
    size: size,
  };

  const icons = {
    hiOutlineEye: <HiOutlineEye {...iconProps} />,
    hiOutlineEyeOff: <HiOutlineEyeOff {...iconProps} />,
    aiOutlinePlus: <AiOutlinePlus {...iconProps} />,
    aiOutlineClose: <AiOutlineClose {...iconProps} />,
    biImport: <BiImport {...iconProps} />,
  };

  return icons[icon];
};

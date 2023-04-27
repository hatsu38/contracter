import React, { FC } from "react";

type PropsType = {
  className?: string;
};

export const DotLoadingAnimation: FC<PropsType> = ({
  className = "",
}: PropsType) => {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <span className="w-1 h-1 bg-primary-800 rounded-full animate-ping" />
      <span className="w-1 h-1 bg-primary-800 rounded-full animate-ping" />
      <span className="w-1 h-1 bg-primary-800 rounded-full animate-ping" />
    </div>
  );
};

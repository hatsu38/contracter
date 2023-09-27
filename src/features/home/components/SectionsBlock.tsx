import { FC } from "react";

import { DotLoadingAnimation } from "@keiyomi/components";

type PropsType = {
  isLoading: boolean;
  title: string;
  text: string;
  className?: string;
};

export const SectionsBlock: FC<PropsType> = ({
  isLoading,
  title,
  text,
  className = "",
}) => {
  const array = ["🤖", "🦾", "⚒️", "⏳", "🏋️"];
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomValue = array[randomIndex];
  return (
    <div
      className={`shadow-lg w-full bg-white px-10 py-8 rounded-lg ${className}`}
    >
      <style>
        {`
          .myStyledDiv h2 {
            color: rgb(75 85 99);
            font-weight: 700;
            margin-top: 0.75rem;
          }

          .myStyledDiv p {
            font-size: 14px;
            white-space: pre-wrap;
          }
        `}
      </style>
      <h3 className="text-center font-bold text-xl">{title}</h3>
      {isLoading ? (
        <div className="mt-8 text-center text-sm text-gray-600 space-y-3">
          <span className="">AIによる要約中です{randomValue}</span>
          <DotLoadingAnimation className="justify-center" />
        </div>
      ) : (
        <div
          className="myStyledDiv overflow-scroll max-h-[60vh]"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </div>
  );
};

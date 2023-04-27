import { FC } from "react";

import { DotLoadingAnimation } from "@keiyomi/components";
import { SectionType, SummarySectionType } from "@keiyomi/features/home";

type PropsType = {
  isLoading: boolean;
  title: string;
  sections: SectionType[] | SummarySectionType[];
  className?: string;
};

export const SectionsBlock: FC<PropsType> = ({
  isLoading,
  title,
  sections,
  className = "",
}) => {
  return (
    <div
      className={`shadow-lg w-full bg-white px-10 py-8 rounded-lg ${className}`}
    >
      <h3 className="text-center font-bold text-xl">{title}</h3>
      {isLoading ? (
        <DotLoadingAnimation />
      ) : (
        sections.map((item, index) => (
          <section className="pt-10" key={`${item.sectionId}-${index}`}>
            <h2 className="text-gray-600 font-bold">{item.sectionTitle}</h2>
            <p className="text-sm whitespace-pre-wrap">
              {"sectionSummary" in item
                ? item.sectionSummary
                : item.sectionContent}
            </p>
          </section>
        ))
      )}
    </div>
  );
};

import { useCallback, useState } from "react";

import { useArray } from "@keiyomi/hooks";

import { useContractSummaryRequest } from "./useContractSummaryRequest";

type ReturnType = {
  htmlParse: (html: string) => void;
  sections: SectionType[];
  isChatRequesting: boolean;
  summarySections: SummarySectionType[];
};

export type SectionType = {
  id: number;
  sectionId: string;
  sectionTitle: string | undefined;
  sectionContent: string | undefined;
};

export type SummarySectionType = SectionType & {
  sectionSummary: string;
};

export const useHtmlParse = (): ReturnType => {
  const { items: summarySections, unshiftItem } =
    useArray<SummarySectionType>();
  const { doSummaryRequest, isChatRequesting } = useContractSummaryRequest("");
  const [sections, setSections] = useState<SectionType[]>([]);

  const handleAiRequest = useCallback(
    (newSections: SectionType[]) => {
      newSections.map((section) => {
        doSummaryRequest({
          message: `${section.sectionTitle}\n${section.sectionContent}`,
          onSuccess: (data) => {
            unshiftItem({
              ...section,
              sectionSummary: data.chatMessage.content,
            });
          },
        });
      });
    },
    [doSummaryRequest, unshiftItem]
  );

  const htmlParse = useCallback(
    (html: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const pdfSections = Array.from(
        doc.querySelectorAll("h2[id^='pdfSection-']")
      );

      const array = pdfSections.map((section) => ({
        id: parseInt(section.id.replace("pdfSection-", "")),
        sectionId: section.id,
        sectionTitle: section.textContent || undefined,
        sectionContent: section.nextElementSibling?.textContent || undefined,
      }));
      setSections(array);
      handleAiRequest(array);
    },
    [handleAiRequest]
  );

  return {
    htmlParse,
    sections,
    summarySections,
    isChatRequesting,
  };
};

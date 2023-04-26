import { useCallback, useState } from "react";

type ReturnType = {
  htmlParse: (html: string) => void;
  sections: SectionType[];
};

export type SectionType = {
  sectionId: string;
  sectionTitle: string | undefined;
  sectionContent: string | undefined;
};

export const useHtmlParse = (): ReturnType => {
  const [sections, setSections] = useState<SectionType[]>([]);

  const htmlParse = useCallback((html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const pdfSections = Array.from(
      doc.querySelectorAll("h2[id^='pdfSection-']")
    );

    const array = pdfSections.map((section) => ({
      sectionId: section.id,
      sectionTitle: section.textContent || undefined,
      sectionContent: section.nextElementSibling?.textContent || undefined,
    }));
    setSections(array);
  }, []);

  return {
    htmlParse,
    sections,
  };
};

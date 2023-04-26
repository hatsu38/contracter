import { useState } from "react";

type ReturnType = {
  htmlParse: (html: string) => void;
  sections: Section[];
};

type Section = {
  sectionId: string;
  sectionTitle: string | undefined;
  sectionContent: string | undefined;
};

export const useHtmlParse = (): ReturnType => {
  const [sections, setSections] = useState<Section[]>([]);

  const htmlParse = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const pdfSections = Array.from(doc.querySelectorAll("h2[id^='pdfSection-']"));

    const ary = pdfSections.map((section) => (
      {
        sectionId: section.id,
        sectionTitle: section.textContent || undefined,
        sectionContent: section.nextElementSibling?.textContent || undefined,
      }
    ));
    setSections(ary);
  };

  return {
    htmlParse,
    sections,
  };
};

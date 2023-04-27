import { GlobalWorkerOptions, version, getDocument } from "pdfjs-dist";
import { useState } from "react";

import {
  useHtmlParse,
  type SectionType,
  SummarySectionType,
} from "./useHtmlParse";

type ReturnType = {
  loadPdfUrl: (pdfUrl: string) => void;
  pdfHtml: string;
  isChatRequesting: boolean;
  sections: SectionType[];
  summarySections: SummarySectionType[];
};

const h2Regex = /^第.{1,2}条[^、,。].+$/gm;
const pTextRegex = /<\/p>\s*<p>/gm;

export const usePdfLoad = (): ReturnType => {
  const { sections, htmlParse, isChatRequesting, summarySections } =
    useHtmlParse();
  GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

  const [pdfHtml, setPdfHtml] = useState<string>("");

  const loadPdfUrl = async (pdfUrl: string) => {
    const loadingTask = getDocument(pdfUrl);
    const pdf = await loadingTask.promise;

    const html = await Promise.all(
      [...Array(pdf.numPages)].map(async (_, index) => {
        const page = await pdf.getPage(index + 1);
        const textContent = await page.getTextContent();
        const text = textContent.items.map(
          (item) => "str" in item && generateStrHtml(item.str)
        );
        const prevText = index === 0 ? "" : "\n\n";
        return `${prevText}${text
          .join("")
          .replace(pTextRegex, "")
          .replace(/<p>\n+/gm, "<p>")
          .replace(/\n+<\/p>/gm, "</p>")}`;
      })
    );
    const newHtml = html.join("");
    setPdfHtml(newHtml);
    htmlParse(newHtml);
  };

  return {
    loadPdfUrl,
    pdfHtml,
    sections,
    isChatRequesting,
    summarySections,
  };
};

const generateStrHtml = (str: string) => {
  if (str.match(h2Regex)) {
    const id = str.substring(0, str.indexOf("条")).replace("第", "");
    // NOTE: idを全角数字の時に、半角にする
    const formattedId = id.replace(/[０-９]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    });
    return `<h2 id="pdfSection-${formattedId}">${str}</h2>`;
  }
  return `<p>${str || "\n\n"}</p>`;
};

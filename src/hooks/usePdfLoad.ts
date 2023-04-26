import { GlobalWorkerOptions, version, getDocument } from "pdfjs-dist";
import { useState } from "react";

type ReturnType = {
  loadPdfUrl: (pdfUrl: string) => void;
  pdfHtml: string;
};

const h2Regex = /^第.{1,2}条.+$/gm;
const pTextRegex = /<\/p>\s*<p>/gm;

export const usePdfLoad = (): ReturnType => {
  GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

  const [pdfHtml, setPdfHtml] = useState<string>("");

  const loadPdfUrl = (pdfUrl: string) => {
    const loadingTask = getDocument(pdfUrl);
    loadingTask.promise.then((pdf) => {
      const numPages = pdf.numPages;
      [...Array(numPages)].map((_, index) => {
        pdf.getPage(index + 1).then((page) => {
          page.getTextContent().then((textContent) => {
            const text = textContent.items.map(
              (item) => "str" in item && generateStrHtml(item.str)
            );
            const prevText = index === 0 ? "" : "\n\n";
            setPdfHtml(
              (prev) =>
                prev + `${prevText}${text.join("").replace(pTextRegex, "")}`
            );
          });
        });
      });
    });
  };

  return {
    loadPdfUrl,
    pdfHtml,
  };
};

const generateStrHtml = (str: string) => {
  if (str.match(h2Regex)) {
    const id = str.substring(0, str.indexOf("条")).replace("第", "");
    return `<h2 id="pdfSection-${id}">${str}</h2>`;
  }
  return `<p>${str || "\n\n"}</p>`;
};

import { GlobalWorkerOptions, version, getDocument } from "pdfjs-dist";
import { useState } from "react";

type ReturnType = {
  loadPdfUrl: (pdfUrl: string) => void;
  pdfText: string;
};

export const usePdfLoad = (): ReturnType => {
  GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

  const [pdfText, setPdfText] = useState<string>("");

  const loadPdfUrl = (pdfUrl: string) => {
    const loadingTask = getDocument(pdfUrl);
    loadingTask.promise.then((pdf) => {
      const numPages = pdf.numPages;
      [...Array(numPages)].map((_, index) => {
        pdf.getPage(index + 1).then((page) => {
          page.getTextContent().then((textContent) => {
            const text = textContent.items.map((item) =>
              "str" in item ? item.str : ""
            );
            setPdfText((prev) => prev + text.join("\n"));
          });
        });
      });
    });
  };

  return {
    loadPdfUrl,
    pdfText,
  };
};

import { GlobalWorkerOptions, version, getDocument } from "pdfjs-dist";
import { useState } from "react";

import { useContractParseHtmlRequest } from "./useContractParseHtmlRequest";
import { useContractSummaryRequest } from "./useContractSummaryRequest";

type ReturnType = {
  loadPdfUrl: (pdfUrl: string) => void;
  text: string;
  defaultText: string;
  isContractSummaryRequesting: boolean;
  isContractParseRequesting: boolean;
};

const h2Regex = /^第.{1,2}条[^、,。].+$/gm;
const pTextRegex = /<\/p>\s*<p>/gm;

export const usePdfLoad = (): ReturnType => {
  const [text, setText] = useState<string>("");
  const [defaultText, setDefaultText] = useState<string>("");
  const {
    doSummaryRequest: doContractSummaryRequest,
    isChatRequesting: isContractSummaryRequesting,
  } = useContractSummaryRequest("");
  const {
    doSummaryRequest: doContractParseRequest,
    isChatRequesting: isContractParseRequesting,
  } = useContractParseHtmlRequest("");
  GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

  const loadPdfUrl = async (pdfUrl: string) => {
    const loadingTask = getDocument(pdfUrl);
    const pdf = await loadingTask.promise;

    const parsedText = await Promise.all(
      [...Array(pdf.numPages)].map(async (_, index) => {
        const page = await pdf.getPage(index + 1);
        const textContent = await page.getTextContent();
        const text = textContent.items.map(
          (item) => "str" in item && generateStrHtml(item.str)
        );

        // return text.join("\n");

        const prevText = index === 0 ? "" : "\n\n";
        return `${prevText}${text
          .join("")
          .replace(pTextRegex, "")
          .replace(/<p>\n+/gm, "<p>")
          .replace(/\n+<\/p>/gm, "</p>")}`;
      })
    );
    const joinedText = parsedText.join("\n");
    setDefaultText(joinedText);
    doContractSummaryRequest({
      message: joinedText,
      onSuccess: (data) => {
        setText(data.chatMessage.content);
      },
    });
    // doContractParseRequest({
    //   message: joinedText,
    //   onSuccess: (data) => {
    //     setDefaultText(data.chatMessage.content);
    //   },
    // });
  };

  return {
    loadPdfUrl,
    text,
    defaultText,
    isContractParseRequesting,
    isContractSummaryRequesting,
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



// import { GlobalWorkerOptions, version, getDocument } from "pdfjs-dist";
// import { useState } from "react";

// import { useContractParseHtmlRequest } from "./useContractParseHtmlRequest";
// import { useContractSummaryRequest } from "./useContractSummaryRequest";

// type ReturnType = {
//   loadPdfUrl: (pdfUrl: string) => void;
//   text: string;
//   defaultText: string;
//   isContractSummaryRequesting: boolean;
//   isContractParseRequesting: boolean;
// };

// const h2Regex = /^第.{1,2}条[^、,。].+$/gm;
// const pTextRegex = /<\/p>\s*<p>/gm;

// export const usePdfLoad = (): ReturnType => {
//   const [text, setText] = useState<string>("");
//   const [defaultText, setDefaultText] = useState<string>("");
//   const {
//     doSummaryRequest: doContractSummaryRequest,
//     isChatRequesting: isContractSummaryRequesting,
//   } = useContractSummaryRequest("");
//   // const {
//   //   doSummaryRequest: doContractParseRequest,
//   //   isChatRequesting: isContractParseRequesting,
//   // } = useContractParseHtmlRequest("");
//   GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

//   const loadPdfUrl = async (pdfUrl: string) => {
//     const loadingTask = getDocument(pdfUrl);
//     const pdf = await loadingTask.promise;

//     const parsedText = await Promise.all(
//       [...Array(pdf.numPages)].map(async (_, index) => {
//         const page = await pdf.getPage(index + 1);
//         const textContent = await page.getTextContent();
//         const text = textContent.items.map(
//           (item) => "str" in item && generateStrHtml(item.str)
//         );

//         const prevText = index === 0 ? "" : "\n\n";
//         return `${prevText}${text
//           .join("")
//           .replace(pTextRegex, "")
//           .replace(/<p>\n+/gm, "<p>")
//           .replace(/\n+<\/p>/gm, "</p>")}`;
//       })
//     );
//     const joinedText = parsedText.join("\n");
//     setDefaultText(joinedText);
//     doContractSummaryRequest({
//       message: joinedText,
//       onSuccess: (data) => {
//         setDefaultText(data.chatMessage.content);
//       },
//     });
//     // doContractParseRequest({
//     //   message: joinedText,
//     //   onSuccess: (data) => {
//     //     setText(data.chatMessage.content);
//     //   },
//     // });
//   };

//   return {
//     loadPdfUrl,
//     text,
//     defaultText,
//     isContractParseRequesting,
//     isContractSummaryRequesting,
//   };
// };

// const generateStrHtml = (str: string) => {
//   if (str.match(h2Regex)) {
//     const id = str.substring(0, str.indexOf("条")).replace("第", "");
//     // NOTE: idを全角数字の時に、半角にする
//     const formattedId = id.replace(/[０-９]/g, (s) => {
//       return String.fromCharCode(s.charCodeAt(0) - 65248);
//     });
//     return `<h2 id="pdfSection-${formattedId}">${str}</h2>`;
//   }
//   return `<p>${str || "\n\n"}</p>`;
// };

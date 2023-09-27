// import { useCallback, useState } from "react";

// import { useArray } from "@keiyomi/hooks";

// import { useContractSummaryRequest } from "./useContractSummaryRequest";

// type ReturnType = {
//   htmlParse: (html: string) => void;
//   text: string;
//   isChatRequesting: boolean;
// };

// export type SectionType = {
//   id: number;
//   sectionId: string;
//   sectionTitle: string | undefined;
//   sectionContent: string | undefined;
// };

// export type SummarySectionType = SectionType & {
//   sectionSummary: string;
// };

// export const useHtmlParse = (): ReturnType => {
//   const { items: summarySections, unshiftItem } =
//     useArray<SummarySectionType>();
//   const [text, setText] = useState<string>("");
//   const { doSummaryRequest, isChatRequesting } = useContractSummaryRequest("");

//   const handleAiRequest = useCallback(
//     (newSections: SectionType[]) => {
//       newSections.map((section) => {
//         doSummaryRequest({
//           message: `${section.sectionTitle}\n${section.sectionContent}`,
//           onSuccess: (data) => {
//             unshiftItem({
//               ...section,
//               sectionSummary: data.chatMessage.content,
//             });
//           },
//         });
//       });
//     },
//     [doSummaryRequest, unshiftItem]
//   );

//   const htmlParse = useCallback(
//     (html: string) => {
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(html, "text/html");
//       doSummaryRequest({
//         message: doc.body.textContent || "",
//         onSuccess: (data) => {
//           setText(data.chatMessage.content);
//         },
//       });
//     },
//     [doSummaryRequest, handleAiRequest]
//   );

//   return {
//     htmlParse,
//     text,
//     isChatRequesting,
//   };
// };

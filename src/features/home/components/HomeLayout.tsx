import { useEffect } from "react";

import { Button, DropzoneFileField, Icon } from "@keiyomi/components";
import { useContractSummaryRequest, SectionType } from "@keiyomi/features/home";
import { useFile, usePdfLoad, useArray } from "@keiyomi/hooks";

type SummarySectionType = SectionType & {
  sectionSummary: string;
};

export const HomeLayout = () => {
  const { file, handleDropFile, fileUrl } = useFile();
  const { pdfHtml, sections, loadPdfUrl } = usePdfLoad();
  const { items, unshiftItem } = useArray<SummarySectionType>();
  const { doSummaryRequest, isChatRequesting } = useContractSummaryRequest("");

  useEffect(() => {
    if (fileUrl) loadPdfUrl(fileUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, loadPdfUrl]);

  const handleAiRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sections.map((section) => {
      doSummaryRequest({
        message: `${section.sectionTitle}\n${section.sectionContent}`,
        onSuccess: (data) => {
          unshiftItem({ ...section, sectionSummary: data.chatMessage.content });
        },
      });
    });
  };

  return (
    <main
      className={
        "flex min-h-screen flex-col items-center py-16 bg-gradient-to-b from-primary-100 to-primary-400"
      }
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-primary-500">
          ケイヨミ
        </h1>
        <DropzoneFileField
          className="shadow mt-8 block w-full p-2 bg-white rounded-lg"
          onDropFiles={handleDropFile}
          fileClassName={
            "bg-gray-50 cursor-pointer border border-primary-600 border-dotted rounded-xl py-8"
          }
        >
          <div className="text-center text-primary-400">
            <Icon
              icon="biImport"
              size="2rem"
              color="text-primary-800"
              className="mx-auto"
            />
            <p className="mt-2 font-semibold">
              {file ? file.name : "契約書をPDFをインポート"}
            </p>
          </div>
        </DropzoneFileField>
        {!!items.length && (
          <div className="mt-8 bg-white px-10 py-8 rounded">
            {items
              .sort((a, b) => (a.id < b.id ? -1 : 1))
              .map((item, index) => (
                <section className="pt-10" key={`${item.sectionId}-${index}`}>
                  <h2 className="font-bold">{item.sectionTitle}</h2>
                  <p className="text-sm whitespace-pre-wrap ">
                    {item.sectionSummary}
                  </p>
                </section>
              ))}
          </div>
        )}
        {file && (
          <div className="mt-8">
            <div className="text-center">
              <Button
                text="契約書を要約"
                onClick={handleAiRequest}
                color="primary"
                variant="outlined"
                disabled={isChatRequesting}
              />
            </div>
            <div
              className="mt-8 bg-white shadow max-h-[60vh] overflow-y-auto mx-auto border border-solid border-gray-200 rounded p-2 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: pdfHtml }}
            />
          </div>
        )}
      </div>
    </main>
  );
};

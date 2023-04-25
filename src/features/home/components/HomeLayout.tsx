import { useEffect } from "react";

import { DropzoneFileField, Icon } from "@contracter/components";
import { useFile, usePdfLoad } from "@contracter/hooks";

export const HomeLayout = () => {
  const { file, handleDropFile, fileUrl } = useFile();
  const { pdfText, loadPdfUrl } = usePdfLoad();

  useEffect(() => {
    if (fileUrl) {
      loadPdfUrl(fileUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, loadPdfUrl]);

  return (
    <main className={"m-8 flex min-h-screen flex-col items-center pt-24"}>
      <h1 className="text-red">契約書PDFを読み込み</h1>
      <div className="shadow p-8 space-y-6">
        <DropzoneFileField
          onDropFiles={handleDropFile}
          fileClassName={`cursor-pointer rounded py-2 ${
            file ? "bg-primary-200" : "bg-gray-300"
          }`}
        >
          <div className="flex justify-center items-center text-white ">
            {file ? (
              <p>{file.name}</p>
            ) : (
              <>
                <Icon icon="aiOutlinePlus" size="2rem" color="text-white" />
                <p>契約書をインポート</p>
              </>
            )}
          </div>
        </DropzoneFileField>
      </div>
      <p className="max-h-[60vh] overflow-y-auto mx-auto border border-solid border-gray-200 rounded p-2 whitespace-pre-wrap ">
        {pdfText}
      </p>
    </main>
  );
};

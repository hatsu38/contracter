import { DropzoneFileField, Icon } from "@keiyomi/components";
import { useFile } from "@keiyomi/hooks";

import { SectionsBlock } from "./SectionsBlock";

export const HomeLayout = () => {
  const {
    file,
    handleDropFile,
    text,
    defaultText,
    isContractParseRequesting,
    isContractSummaryRequesting,
  } = useFile();

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
        {file && (
          <div className="mt-8 grid grid-cols-2 gap-x-4">
            <SectionsBlock
              title="本文"
              isLoading={isContractParseRequesting}
              text={defaultText}
            />
            <SectionsBlock
              title="要約"
              isLoading={isContractSummaryRequesting}
              text={text}
            />
          </div>
        )}
      </div>
    </main>
  );
};

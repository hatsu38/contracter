import { DropzoneFileField, Icon } from "@contracter/components";
import { useFile } from "@contracter/features/home/hooks";

export const HomeLayout = () => {
  const { file, handleDropFile } = useFile();

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
    </main>
  );
};

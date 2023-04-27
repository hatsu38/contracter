import { DropzoneFileField, Icon } from "@keiyomi/components";
import { useFile } from "@keiyomi/hooks";

export const HomeLayout = () => {
  const { file, handleDropFile, sections, summarySections, isChatRequesting } =
    useFile();

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
        <div className="flex mt-8 space-x-4">
          <div className="w-full bg-white px-10 py-8 rounded">
            {sections.map((item, index) => (
              <section className="pt-10" key={`${item.sectionId}-${index}`}>
                <h2 className="font-bold">{item.sectionTitle}</h2>
                <p className="text-sm whitespace-pre-wrap">
                  {item.sectionContent}
                </p>
              </section>
            ))}
          </div>
          {isChatRequesting ? (
            <div>Loading</div>
          ) : (
            !!summarySections.length && (
              <div className="w-full bg-white px-10 py-8 rounded">
                {summarySections
                  .sort((a, b) => (a.id < b.id ? -1 : 1))
                  .map((item, index) => (
                    <section
                      className="pt-10"
                      key={`${item.sectionId}-${index}`}
                    >
                      <h2 className="font-bold">{item.sectionTitle}</h2>
                      <p className="text-sm whitespace-pre-wrap">
                        {item.sectionSummary}
                      </p>
                    </section>
                  ))}
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
};

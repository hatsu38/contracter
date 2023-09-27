import { useState } from "react";
import { FileRejection } from "react-dropzone";
import { toast } from "react-toastify";

import { usePdfLoad } from "@keiyomi/hooks";

type ReturnType = {
  file: File | undefined;
  setFile: (value: File | undefined) => void;
  fileUrl: string | undefined;
  text: string;
  defaultText: string;
  isContractSummaryRequesting: boolean;
  handleDropFile: (
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) => void;
};

export const useFile = (): ReturnType => {
  const { text, defaultText, isContractSummaryRequesting, loadPdfUrl } =
    usePdfLoad();
  const [file, setFile] = useState<File | undefined>();

  const fileUrl = file ? URL.createObjectURL(file) : undefined;

  const handleDropFile = (
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) => {
    if (fileRejections.length) {
      fileRejections.map(({ file, errors }) => {
        if (!errors[0]) return;
        toast.error(`${file.name} - ${errors[0].message}`);
      });
      return;
    }
    const newFile = acceptedFiles[0];
    setFile(newFile);
    loadPdfUrl(URL.createObjectURL(newFile));
  };

  return {
    file,
    fileUrl,
    text,
    defaultText,
    isContractSummaryRequesting,
    setFile,
    handleDropFile,
  };
};

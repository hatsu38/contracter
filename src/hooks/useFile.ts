import { useState } from "react";
import { FileRejection } from "react-dropzone";
import { toast } from "react-toastify";

type ReturnType = {
  file: File | undefined;
  setFile: (value: File | undefined) => void;
  fileUrl: string | undefined;
  handleDropFile: (
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) => void;
};

export const useFile = (): ReturnType => {
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
    setFile(acceptedFiles[0]);
  };

  return {
    file,
    fileUrl,
    setFile,
    handleDropFile,
  };
};

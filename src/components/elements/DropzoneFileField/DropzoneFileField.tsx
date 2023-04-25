import React, { FC, ReactNode } from "react";
import ReactDropzone, {
  FileRejection,
  FileError,
  ErrorCode,
} from "react-dropzone";

import { convertReadableByte } from "@keiyomi/utils";

import { FILE_MAX_BYTE_SIZE, ACCEPT_IMPORT_FILE_TYPES } from "./constants";

type PropsType = {
  noClick?: boolean;
  fileClassName?: string;
  multiple?: boolean;
  onDropFiles: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
  acceptFileTypes?: Record<string, string[]>;
  required?: boolean;
  maxFileByte?: number;
  minFileByte?: number;
  children: ReactNode;
  readonly?: boolean;
  maxFiles?: number;
};

export const DropzoneFileField: FC<PropsType> = ({
  noClick = false,
  onDropFiles,
  acceptFileTypes = ACCEPT_IMPORT_FILE_TYPES,
  maxFileByte = FILE_MAX_BYTE_SIZE,
  minFileByte = 0,
  fileClassName,
  readonly = false,
  children,
  maxFiles,
}: PropsType) => {
  const jaErrorMessage = (error: FileError) => {
    switch (error.code) {
      case ErrorCode.FileInvalidType:
        return `アップロードできるファイルの拡張子は ${Object.values(
          acceptFileTypes
        ).join(",")} です`;
      case ErrorCode.FileTooLarge:
        return `アップロードできる最大ファイルサイズは${convertReadableByte(
          maxFileByte
        )}です`;
      case ErrorCode.FileTooSmall:
        return `アップロードできる最小ファイルサイズは${convertReadableByte(
          minFileByte
        )}です`;
      case ErrorCode.TooManyFiles:
        return `アップロードできるファイルは${maxFiles || 1}つです`;
      default:
        return error.message;
    }
  };

  const jaFileRejections = (fileRejections: FileRejection[]) => {
    return fileRejections.map((reject) => ({
      file: reject.file,
      errors: reject.errors.map((error) => ({
        code: error.code,
        message: jaErrorMessage(error),
      })),
    }));
  };

  return (
    <div>
      <ReactDropzone
        maxFiles={maxFiles}
        noClick={noClick}
        disabled={readonly}
        onDrop={(acceptedFiles, fileRejections) =>
          onDropFiles(acceptedFiles, jaFileRejections(fileRejections))
        }
        accept={acceptFileTypes}
        multiple={false}
        maxSize={maxFileByte}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            className={`${isDragActive && "bg-primary-200"} ${fileClassName}`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {children}
          </div>
        )}
      </ReactDropzone>
    </div>
  );
};

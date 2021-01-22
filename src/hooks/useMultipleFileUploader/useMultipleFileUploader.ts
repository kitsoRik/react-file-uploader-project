import { useState } from "react";
import axios from "axios";
import { FileState, FileStateStatus } from "../../types/FileState";
import { createFileConfig, createFileStates } from "./utils";

export const useMultipleFileUploader = () => {
  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const setFileState = (id: string, fileState: Partial<FileState>) => {
    setFileStates((fileStates) => [
      ...fileStates.map((s) => {
        if (s.id !== id) return s;

        return { ...s, ...fileState };
      }),
    ]);
  };

  const upload = (files: FileList | File[]) => {
    const fileStates = createFileStates(files);

    setFileStates(fileStates);

    fileStates.forEach(async ({ file }, index) => {
      const fileState = fileStates[index];
      const formData = new FormData();

      formData.append("file", file);

      const uploadFile = async () => {
        try {
          const { url, cancelToken, abort } = createFileConfig(file);

          setFileState(fileState.id, {
            status: FileStateStatus.UPLOADING,
            upload: uploadFile,
            abort,
          });
          const { data } = await axios.post(url, formData, {
            cancelToken,
          });
          setFileState(fileState.id, {
            status: FileStateStatus.UPLOAD_SUCCESS,
            data,
          });
        } catch (error) {
          setFileState(fileState.id, {
            status:
              error instanceof axios.Cancel
                ? FileStateStatus.CANCELED
                : FileStateStatus.UPLOAD_ERROR,
            error,
          });
        }
      };

      await uploadFile();
    });
  };

  return {
    fileStates,
    upload,
  };
};

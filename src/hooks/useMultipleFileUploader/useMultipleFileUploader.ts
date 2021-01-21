import { useState } from "react";
import axios from "axios";
import { FileState, FileStateStatus } from "../../types/FileState";
import { FileConfig } from "../../types/FileConfig";

const createFileConfigs = (files: FileList | File[]): FileConfig[] => {
  return Array.from(files).map((file) => {
    const { cancel, token: cancelToken } = axios.CancelToken.source();

    return {
      url: "http://localhost:4000/upload",
      file,
      cancelToken,
      abort: () => {
        console.log("C");
        cancel();
      },
    };
  });
};

const createFileStates = (files: FileList | File[], configs: FileConfig[]) => {
  const fileStates: FileState[] = [];

  for (let i = 0; i < files.length; i++) {
    const id = `${i}`;
    const file = files[i];
    const config = configs[i];

    const url = URL.createObjectURL(file);

    fileStates.push({
      id,
      status: FileStateStatus.UPLOADING,

      file,
      config,

      url,

      abort: () => config.abort(),
    });
  }

  return fileStates;
};

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
    const configs = createFileConfigs(files);
    const fileStates = createFileStates(files, configs);

    setFileStates(fileStates);

    configs.map(async ({ url, file, cancelToken }, index) => {
      const fileState = fileStates[index];
      const formData = new FormData();

      formData.append("file", file);

      try {
        const { data } = await axios.post(url, formData, {
          cancelToken,
        });

        setFileState(fileState.id, {
          status: FileStateStatus.UPLOAD_SUCCESS,
          data,
        });
      } catch (error) {
        setFileState(fileState.id, {
          status: FileStateStatus.UPLOAD_ERROR,
          error,
        });
      }
    });
  };

  return {
    fileStates,
    upload,
  };
};

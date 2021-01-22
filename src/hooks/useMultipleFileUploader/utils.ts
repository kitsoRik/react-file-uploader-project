import axios from "axios";

import { FileConfig } from "../../types/FileConfig";
import { FileState, FileStateStatus } from "../../types/FileState";

export const createFileConfig = (file: File): FileConfig => {
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
};

export const createFileStates = (files: FileList | File[]) => {
  const fileStates: FileState[] = [];

  for (let i = 0; i < files.length; i++) {
    const id = `${i}`;
    const file = files[i];

    const url = URL.createObjectURL(file);

    fileStates.push({
      id,
      status: FileStateStatus.UPLOADING,

      file,

      url,

      abort: () => {},

      upload: () => {},
    });
  }

  return fileStates;
};

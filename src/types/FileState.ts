import { FileConfig } from "./FileConfig";

export enum FileStateStatus {
  NOT_UPLOAD,
  UPLOADING,
  UPLOAD_SUCCESS,
  UPLOAD_ERROR,
  CANCELED,
}

export type FileState = {
  id: string;
  status: FileStateStatus;

  file: File;
  config?: FileConfig;

  url: string;

  data?: any;
  error?: any;

  abort: () => void;
  upload: () => void;
};

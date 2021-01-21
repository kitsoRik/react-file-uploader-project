import { CancelToken } from "axios";

export type FileConfig = {
  url: string;
  file: File;
  cancelToken: CancelToken;

  abort: () => void;
};

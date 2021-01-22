import { useMultipleFileUploader } from "../useMultipleFileUploader";

export const useSingleFileUploader = () => {
  const { fileStates, upload } = useMultipleFileUploader();

  return {
    fileState: fileStates[0],
    upload: (file: File) => upload([file]),
  };
};

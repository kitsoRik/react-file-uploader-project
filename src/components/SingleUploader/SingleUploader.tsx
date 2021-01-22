import { useSingleFileUploader } from "../../hooks/useSingleFileUploader";
import { FileStateStatus } from "../../types/FileState";
import FileAlert from "../FileAlert";

const SingleUploader = () => {
  const { fileState, upload } = useSingleFileUploader();

  const input = (
    <input
      type="file"
      onChange={(e) => e.target.files && upload(e.target.files[0])}
    />
  );

  if (!fileState) return input;

  const { id, status, abort, upload: uploadAgain } = fileState;

  return (
    <>
      <FileAlert
        index={1}
        key={id}
        name="string.png"
        type="default"
        isLoading={status === FileStateStatus.UPLOADING}
        isTryMore={[
          FileStateStatus.UPLOAD_ERROR,
          FileStateStatus.CANCELED,
        ].includes(status)}
        isCancel={status === FileStateStatus.UPLOADING}
        isError={status === FileStateStatus.UPLOAD_ERROR}
        isCanceled={status === FileStateStatus.CANCELED}
        isSuccess={status === FileStateStatus.UPLOAD_SUCCESS}
        onCancel={abort}
        onTryMore={uploadAgain}
      />
      {input}
    </>
  );
};

export default SingleUploader;

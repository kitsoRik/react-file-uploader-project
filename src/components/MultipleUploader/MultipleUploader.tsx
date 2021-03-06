import { useMultipleFileUploader } from "../../hooks/useMultipleFileUploader";
import { FileStateStatus } from "../../types/FileState";
import FileAlert from "../FileAlert";

const MultipleUploader = () => {
  const { fileStates, upload } = useMultipleFileUploader();

  return (
    <>
      {fileStates.map(({ id, status, abort, upload, file }, index) => (
        <FileAlert
          index={index}
          key={id}
          name={file.name}
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
          onTryMore={upload}
        />
      ))}
      <input
        type="file"
        multiple={true}
        onChange={(e) => e.target.files && upload(e.target.files)}
      />
    </>
  );
};

export default MultipleUploader;

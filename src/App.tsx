import "./App.css";
import FileAlert from "./components/FileAlert";
import { useMultipleFileUploader } from "./hooks/useMultipleFileUploader";
import { FileStateStatus } from "./types/FileState";

function App() {
  const { fileStates, upload } = useMultipleFileUploader();

  return (
    <div className="App">
      {fileStates.map(({ id, status, abort, upload }, index) => (
        <FileAlert
          index={index}
          key={id}
          name="string.png"
          type="default"
          isLoading={status === FileStateStatus.UPLOADING}
          isTryMore={[
            FileStateStatus.UPLOAD_ERROR,
            FileStateStatus.CANCELED,
          ].includes(status)}
          isCancel={status === FileStateStatus.UPLOADING}
          onCancel={abort}
          onTryMore={upload}
        />
      ))}
      <input
        type="file"
        onChange={(e) => e.target.files && upload(e.target.files)}
      />
      123
    </div>
  );
}

export default App;

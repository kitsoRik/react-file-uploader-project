import "./App.css";
import { useMultipleFileUploader } from "./hooks/useMultipleFileUploader";

function App() {
  const { fileStates, upload } = useMultipleFileUploader();

  console.log(fileStates);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => e.target.files && upload(e.target.files)}
      />
      123
    </div>
  );
}

export default App;

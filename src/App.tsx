import "./App.css";
import MultipleUploader from "./components/MultipleUploader";
import SingleUploader from "./components/SingleUploader";

function App() {
  return (
    <div className="App">
      <div className="Wrapper">
        <h1>Multiple uploader</h1>
        <MultipleUploader />
      </div>
      <div className="Wrapper">
        <h1>Single uploader</h1>
        <SingleUploader />
      </div>
    </div>
  );
}

export default App;

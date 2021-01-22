interface Props {
  onUpload: (file: FileList) => void;
}

const MultipleUploader = ({ onUpload }: Props) => {
  return (
    <input
      type="file"
      multiple={true}
      onChange={(e) => e.target.files && onUpload(e.target.files)}
    />
  );
};

export default MultipleUploader;

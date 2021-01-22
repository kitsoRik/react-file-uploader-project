import classes from "./FileAlert.module.scss";

interface Props {
  index: number;
  name: string;
  type: "default" | "success" | "warning" | "error";

  isTryMore: boolean;
  isCancel: boolean;

  isLoading: boolean;
  isError: boolean;
  isCanceled: boolean;
  isSuccess: boolean;

  onTryMore: () => void;
  onCancel: () => void;
}

const FileAlert = ({
  index,
  name,
  type,
  isTryMore,
  isCancel,

  isLoading,
  isError,
  isCanceled,
  isSuccess,

  onCancel,
  onTryMore,
}: Props) => {
  return (
    <div className={classes.fileAlert} attr-type={type}>
      {index}) {name}
      {isLoading && <span>Loading</span>}
      {isError && <span>Error</span>}
      {isCanceled && <span>Canceled</span>}
      {isSuccess && <span>Success</span>}
      {isCancel && (
        <button className={classes.action} attr-type="error" onClick={onCancel}>
          Cancel
        </button>
      )}
      {isTryMore && (
        <button
          className={classes.action}
          attr-type="warning"
          onClick={onTryMore}
        >
          Try more
        </button>
      )}
    </div>
  );
};

export default FileAlert;

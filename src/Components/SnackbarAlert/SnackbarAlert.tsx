import { Alert, AlertColor, Snackbar } from "@mui/material";

function SnackbarAlert({
  text,
  onClose,
  type,
  isOpen,
}: {
  text: string;
  onClose: () => void;
  type: AlertColor;
  isOpen: boolean;
}) {
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={1500}
      onClose={() => onClose()}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={() => onClose()} severity={type} sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarAlert;

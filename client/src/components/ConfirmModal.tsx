import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";

export enum ActionType {
  UPDATE,
  SUBMIT,
  DELETE,
}

export interface ConfirmationDialogRawProps {
  action: ActionType;
  title: string;
  content: string;
  open: boolean;
  onClose: (state: boolean) => void;
}

export default function ConfirmModal(props: ConfirmationDialogRawProps) {
  const { onClose, title, content, open, action, ...other } = props;

  React.useEffect(() => {}, [open]);

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  const getLocalesData = () => {
    switch (action) {
      case ActionType.UPDATE:
        return "Update";
      case ActionType.DELETE:
        return "Delete";
      case ActionType.SUBMIT:
        return "Submit";
    }
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      PaperProps={{ sx: { position: "fixed", top: 10, m: 0 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>{getLocalesData()}</Button>
      </DialogActions>
    </Dialog>
  );
}

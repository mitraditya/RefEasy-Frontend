import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle
} from "@mui/material";
import React from "react";

export default function ConfirmBox(props) {

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogActions>
          <Button onClick={props.handleClose}>No</Button>
          <Button onClick={props.handleYes} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

import { Fragment } from "react";
import { Snackbar as Snack } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { snackbarType } from "./types";

const Snackbar = ({ open, setOpen, msg }: snackbarType) => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Fragment>
      <AiOutlineClose
        size={18}
        style={{ cursor: "pointer" }}
        onClick={handleClose}
      />
    </Fragment>
  );
  return (
    <Snack
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleClose}
      message={msg}
      action={action}
    />
  );
};

export default Snackbar;

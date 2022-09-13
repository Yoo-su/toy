import { SetStateAction, Dispatch } from "react";

export type snackbarType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  msg: string;
};

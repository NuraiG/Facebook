import { ClickAwayListener, makeStyles, Popper } from "@material-ui/core";
import React from "react";
import { grayTheme } from "../customThemes";
import styles from "./PopperComponent.module.scss";

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: grayTheme.palette.secondary.main,
    boxSizing: "border-box",
    borderRadius: "8px",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.5) 0px 0px 0px 1px inset",
  },
}));

export default function PopperComponent({
  open,
  anchorRef,
  handleClose,
  children,
}) {
  const classes = useStyles();
  return (
    <Popper
      open={open}
      anchorEl={anchorRef ? anchorRef.current : undefined}
      role={undefined}
      disablePortal
      style={{ position: "absolute", top: "45px" }}
    >
      <div className={`${classes.paper} ${styles.popper}`}>
        <ClickAwayListener onClickAway={handleClose}>
          <div>{children}</div>
        </ClickAwayListener>
      </div>
    </Popper>
  );
}

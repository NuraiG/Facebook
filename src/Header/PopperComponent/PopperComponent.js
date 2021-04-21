import React from "react";
import { useSelector } from "react-redux";
import { grayTheme, grayThemeDark } from "../../customThemes";
import styles from "./PopperComponent.module.scss";

import { ClickAwayListener, makeStyles, Popper } from "@material-ui/core";

export default function PopperComponent({
  open,
  anchorRef,
  handleClose,
  children,
}) {
  const isDarkModeOn = useSelector(
    (state) => state.currentUser.currentUser.darkModeTurnedOn
  );

  let theme = isDarkModeOn ? grayThemeDark : grayTheme;

  const useStyles = makeStyles(() => ({
    paper: {
      backgroundColor: theme.palette.secondary.main,
      boxSizing: "border-box",
      borderRadius: "8px",
      boxShadow: isDarkModeOn
        ? "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset"
        : "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.5) 0px 0px 0px 1px inset",
    },
  }));

  const classes = useStyles();
  return (
    <Popper
      open={open}
      anchorEl={anchorRef ? anchorRef.current : undefined}
      role={undefined}
      disablePortal
      style={{ position: "absolute", top: "45px", borderRadius: "8px", overflow: "hidden" }}
    >
      <div className={`${classes.paper} ${styles.popper}`}>
        <ClickAwayListener onClickAway={handleClose}>
          <div>{children}</div>
        </ClickAwayListener>
      </div>
    </Popper>
  );
}

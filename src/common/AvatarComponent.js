import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, ThemeProvider } from "@material-ui/core";
import styles from "./AvatarComponent.module.scss";
import { grayButtonTheme } from "../customThemes";

export default function AvatarComponent({ className, showFullName, onClick, linkTo }) {
  return (
    <ThemeProvider theme={grayButtonTheme}>
    <Link to={linkTo} className={styles.link}>
      <Button color="primary" className={`${className} ${styles.avatar_wrapper} hover_col secondary_txt`} onClick={onClick}>
        <Avatar />
        <h4 className={styles.avatar_text}>{showFullName ? "John Doe" : "John"}</h4>
      </Button>
    </Link>
    </ThemeProvider>
  );
}

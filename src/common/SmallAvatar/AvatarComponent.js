import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Button, ThemeProvider } from "@material-ui/core";
import styles from "./AvatarComponent.module.scss";
import { grayButtonTheme } from "../../customThemes";

export default function AvatarComponent({ className, showFullName, onClick }) {
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  return (
    <ThemeProvider theme={grayButtonTheme}>
      <Link to={`/profile/${currentUser.id}`} className={styles.link}>
        <Button
          color="primary"
          className={`${className} ${styles.avatar_wrapper}`}
          onClick={onClick}
        >
          <Avatar src={currentUser.profile_image} />
          <h4 className={styles.avatar_text}>
            {showFullName
              ? currentUser.firstName + " " + currentUser.lastName
              : currentUser.firstName}
          </h4>
        </Button>
      </Link>
    </ThemeProvider>
  );
}

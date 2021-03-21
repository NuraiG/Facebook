import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./AvatarComponent.module.css";

export default function AvatarComponent({ className, showFullName, onClick, linkTo }) {
  return (
    <Link to={linkTo} className={styles.link}>
      <div className={`${className} ${styles.avatar_wrapper} hover_col secondary_txt`} onClick={onClick}>
        <Avatar />
        <h4 className={styles.avatar_text}>{showFullName ? "John Doe" : "John"}</h4>
      </div>
    </Link>
  );
}

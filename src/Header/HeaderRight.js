import { IconButton } from "@material-ui/core";
import React from "react";
import styles from "./Header.module.css";

import AddIcon from "@material-ui/icons/Add";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import AvatarComponent from "../common/AvatarComponent";

export default function HeaderRight() {
  return (
    <div className={styles.header__right}>
      <AvatarComponent
        className={`${styles.header__info}`}
        showFullName={false}
        linkTo={`/profile/${`userId`}`}
      />

      <IconButton className={`${styles.icon_btn} hover_btn secondary_button_bg secondary_txt`}>
        <AddIcon />
      </IconButton>
      <IconButton className={`${styles.icon_btn} hover_btn secondary_button_bg secondary_txt`}>
        <ChatRoundedIcon />
      </IconButton>
      <IconButton className={`${styles.icon_btn} hover_btn secondary_button_bg secondary_txt`}>
        <NotificationsRoundedIcon />
      </IconButton>
      <IconButton className={`${styles.arrow_btn} hover_btn secondary_button_bg secondary_txt`}>
        <ArrowDropDownRoundedIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

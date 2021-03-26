import React from "react";
import AvatarComponent from "../common/SmallAvatar/AvatarComponent";

import styles from "./Header.module.scss";
import { grayButtonTheme } from "../customThemes";

// Material-UI
import { IconButton, ThemeProvider, Tooltip } from "@material-ui/core";
// Icons
import AddIcon from "@material-ui/icons/Add";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";

export default function HeaderRight() {
  return (
    <div className={styles.header__right}>
      <ThemeProvider theme={grayButtonTheme}>
        <AvatarComponent
          className={`${styles.header__info}`}
          showFullName={false}
          linkTo={`/profile/${`userId`}`}
        />

        <Tooltip title="Create" placement="bottom">
          <IconButton color="primary" className={`${styles.icon_btn}`}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Messenger" placement="bottom">
          <IconButton color="primary" className={`${styles.icon_btn}`}>
            <ChatRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications" placement="bottom">
          <IconButton color="primary" className={`${styles.icon_btn}`}>
            <NotificationsRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Account" placement="bottom">
          <IconButton color="primary" className={`${styles.arrow_btn}`}>
            <ArrowDropDownRoundedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </ThemeProvider>
    </div>
  );
}

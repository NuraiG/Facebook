import React, { useRef, useState } from "react";
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
import PopperComponent from "./PopperComponent";
import NotificationsPopupContent from "./NotificationsPopupContent";

export default function HeaderRight() {
  const [openNotifications, setOpenNotifications] = useState(false);
  const notificationsRef = useRef(null);

  const [openAccount, setOpenAccount] = useState(false);
  const anchorRef = useRef(null);

  const handleOpenNotifications = () => {
    console.log(notificationsRef);
    setOpenNotifications(true);
  };

  const handleCloseNotifications = (event) => {
    if (
      notificationsRef.current &&
      notificationsRef.current.contains(event.target)
    ) {
      return;
    }
    setOpenNotifications(false);
  };

  return (
    <div className={styles.header__right}>
      <ThemeProvider theme={grayButtonTheme}>
        <AvatarComponent
          className={`${styles.header__info}`}
          showFullName={false}
        />

        <Tooltip title="Create" placement="bottom">
          <IconButton
            color="primary"
            className={`${styles.icon_btn}`}
            // ref={anchorRef}
            // aria-controls={open ? "menu-list-grow" : undefined}
            // aria-haspopup="true"
            // onClick={handleOpen}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Messenger" placement="bottom">
          <IconButton
            color="primary"
            className={`${styles.icon_btn}`}
            // ref={anchorRef}
            // aria-controls={open ? "menu-list-grow" : undefined}
            // aria-haspopup="true"
            // onClick={handleOpen}
          >
            <ChatRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications" placement="bottom">
          <IconButton
            color="primary"
            className={`${styles.icon_btn}`}
            ref={notificationsRef}
            aria-controls={openNotifications ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleOpenNotifications}
          >
            <NotificationsRoundedIcon />
          </IconButton>
        </Tooltip>
        <PopperComponent
          open={openNotifications}
          anchorEl={notificationsRef.current ? notificationsRef : undefined}
          handleClose={handleCloseNotifications}
        >
          <NotificationsPopupContent />
        </PopperComponent>
        <Tooltip title="Account" placement="bottom">
          <IconButton
            color="primary"
            className={`${styles.arrow_btn}`}
            // ref={anchorRef}
            // aria-controls={open ? "menu-list-grow" : undefined}
            // aria-haspopup="true"
            // onClick={handleOpen}
          >
            <ArrowDropDownRoundedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        {/* <PopperComponent
          open={open}
          anchorEl={anchorRef.current}
          handleClose={handleClose}
        /> */}

      </ThemeProvider>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { blueGreenTheme, grayButtonTheme, grayTheme } from "../customThemes";
import styles from "./FriendRequestComponent.module.scss";

import { Avatar, Button, Paper, ThemeProvider } from "@material-ui/core";
import { getUserById } from "../firebase/service";
import { getServerTime, getShortDate } from "../utils/timeUtils";

export default function FriendRequestComponent({
  friendRequestObj,
  onClick,
  onAccept,
  onReject,
}) {
  const { t } = useTranslation();

  let formattedTimestamp = getShortDate(
    getServerTime()?.toDate(),
    new Date(friendRequestObj.timestamp?.toDate())
  );
  let [user, setUser] = useState({});

  useEffect(() => {
    getUserById(friendRequestObj.from).then((dbUser) => {
      setUser({
        fullName: dbUser.firstName + " " + dbUser.lastName, // sender full name
        profile_image: dbUser.profile_image, // sender profile pic
      });
    });
  }, [friendRequestObj.from]);

  return (
    <ThemeProvider theme={grayTheme}>
      <Paper color="secondary" className={styles.wrapper} onClick={onClick}>
        <Avatar src={user.profile_image} className={styles.avatar} />
        <div className={styles.request_info_container}>
          <div className={styles.request_info}>
            <h4>{`${user.fullName}`}</h4>
            <span>{formattedTimestamp}</span>
          </div>
          <div className={styles.request_info}>
            <ThemeProvider theme={blueGreenTheme}>
              <Button
                color="primary"
                variant="contained"
                className={styles.btn}
                onClick={() =>
                  onAccept(
                    friendRequestObj.id,
                    friendRequestObj.from,
                    friendRequestObj.to
                  )
                }
              >
                {t("friendRequestsPage.confirm")}
              </Button>
            </ThemeProvider>
            <ThemeProvider theme={grayButtonTheme}>
              <Button
                color="primary"
                variant="contained"
                className={styles.btn}
                onClick={() =>
                  onReject(friendRequestObj.id, friendRequestObj.from)
                }
              >
                {t("friendRequestsPage.remove")}
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

import React from "react";
import { blueGreenTheme, grayButtonTheme, grayTheme } from "../customThemes";
import styles from "./FriendRequestComponent.module.scss";
// import { getShortDate } from '../timeUtils';

import { Avatar, Button, Paper, ThemeProvider } from "@material-ui/core";

export default function FriendRequestComponent({
  user,
  friendRequestObj,
  onClick,
  onAccept,
  onReject,
}) {
  // let formattedTimestamp = getShortDate(friendRequestObj.timestamp);
  let formattedTimestamp = "1y";

  return (
    <ThemeProvider theme={grayTheme}>
      <Paper color="secondary" className={styles.wrapper} onClick={onClick}>
        <Avatar src={user.profile_image} className={styles.avatar} />
        <div className={styles.request_info_container}>
          <div className={styles.request_info}>
            {/* <h4>{`${friendRequest.senderFullName}`}</h4> */}
            <h4>{`${user.firstName} ${user.lastName}`}</h4>
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
                Confirm
              </Button>
            </ThemeProvider>
            <ThemeProvider theme={grayButtonTheme}>
              <Button
                color="primary"
                variant="contained"
                className={styles.btn}
                onClick={() =>
                  onReject(friendRequestObj.id, friendRequestObj.to)
                }
              >
                Remove
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </Paper>
    </ThemeProvider>
  );
}
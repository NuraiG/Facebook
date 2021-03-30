import React from "react";
import { blueGreenTheme, grayButtonTheme } from "../customThemes";
// import { getShortDate } from '../timeUtils';

import { Avatar, Button, ThemeProvider } from "@material-ui/core";

export default function FriendRequestComponent({ user, friendRequestObj }) {
  // let formattedTimestamp = getShortDate(friendRequestObj.timestamp);
  let formattedTimestamp = "1y";

  return (
    <div>
      <Avatar src={user.profile_image} />
      <div>{`${user.firstName} ${user.lastName}`}</div>
      <span>{formattedTimestamp}</span>
      <ThemeProvider theme={blueGreenTheme}>
        <Button color="primary" variant="contained">Confirm</Button>
      </ThemeProvider>
      <ThemeProvider theme={grayButtonTheme}>
        <Button color="primary" variant="contained">Remove</Button>
      </ThemeProvider>
    </div>
  );
}

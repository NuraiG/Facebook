import React from "react";
import styles from "./Intro.module.scss";

import { Box, Card, ThemeProvider } from "@material-ui/core";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import RoomIcon from "@material-ui/icons/Room";
import CakeIcon from "@material-ui/icons/Cake";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { grayTheme } from "../customThemes";

export default function Intro({ userProfileData }) {
  return (
    <aside>
      <ThemeProvider theme={grayTheme}>
        <Card color="secondary" className={styles.card}>
          <h2 className={styles.heading}>Intro</h2>
          {userProfileData.residence && (
            <Box className={styles.profile_info}>
              <HomeRoundedIcon />
              Lives in {userProfileData.residence}
            </Box>
          )}
          {userProfileData.birthPlace && (
            <Box className={styles.profile_info}>
              <RoomIcon />
              From {userProfileData.birthPlace}
            </Box>
          )}
          <Box className={styles.profile_info}>
            <CakeIcon />
            Born on {new Date(userProfileData.birthDate).toDateString()}
          </Box>
          <Box className={styles.profile_info}>
            <WatchLaterIcon />
            Joined on {new Date(userProfileData.registrationDate).toDateString()}
          </Box>
        </Card>
      </ThemeProvider>
    </aside>
  );
}

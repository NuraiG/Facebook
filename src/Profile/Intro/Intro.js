import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Intro.module.scss";

import { Box, Card, ThemeProvider, Button } from "@material-ui/core";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import RoomIcon from "@material-ui/icons/Room";
import CakeIcon from "@material-ui/icons/Cake";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { grayTheme, grayThemeDark } from "../../customThemes";

import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "./../CurrentUser.actions";

import { updateUserBirthPlace, updateUserResidence } from "../../firebase/service";

import IntroUpdateDialog from "./IntroUpdateDialog";

export default function Intro({ userProfileData }) {
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [birthPlaceInput, setBirthPlace] = useState(currentUser.birthPlace);
  const [residenceInput, setResidence] = useState(currentUser.residence);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const saveData = () => {
    updateUserResidence(currentUser.id, residenceInput);
    updateUserBirthPlace(currentUser.id, birthPlaceInput);
    dispatch(
      updateUserProfile({
        ...currentUser,
        birthPlace: birthPlaceInput,
        residence: residenceInput,
      })
    );
    setIsDialogOpen(false);
  };

  const useStyles = makeStyles((theme) => ({
    button: {
      fontWeight: 600,
    },
  }));
  const classes = useStyles();
  return (
    <aside>
      <ThemeProvider theme={currentUser.darkModeTurnedOn ? grayThemeDark : grayTheme}>
        <Card color="secondary" className={styles.card}>
          <h2 className={styles.heading}>{t("profilePage.intro")}</h2>
          {userProfileData.residence && (
            <Box className={styles.profile_info}>
              <HomeRoundedIcon fontSize="inherit" />
              {t("profilePage.residence")}
              {userProfileData.residence}
            </Box>
          )}
          {userProfileData.birthPlace && (
            <Box className={styles.profile_info}>
              <RoomIcon />
              {t("profilePage.birthPlace")}
              {userProfileData.birthPlace}
            </Box>
          )}
          <Box className={styles.profile_info}>
            <CakeIcon />
            {t("profilePage.bornOn")}
            {userProfileData.birthDate?.toDate().toDateString()}
          </Box>
          <Box className={styles.profile_info}>
            <WatchLaterIcon />
            {t("profilePage.joinedOn")}
            {userProfileData.registrationDate?.toDate().toDateString()}
          </Box>
          {currentUser.id === userProfileData.id ? (
            <Box className={styles.btn}>
              <Button
                variant="contained"
                color="default"
                fullWidth
                className={classes.button}
                style={{ fontSize: "14px" }}
                onClick={handleDialogOpen}
              >
                {t("profilePage.editDetails")}
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Card>
      </ThemeProvider>
      <IntroUpdateDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        birthPlace={birthPlaceInput}
        onChangeBirthPlace={setBirthPlace}
        onChangeResidence={setResidence}
        residence={residenceInput}
        updateProfilData={saveData}
      />
    </aside>
  );
}

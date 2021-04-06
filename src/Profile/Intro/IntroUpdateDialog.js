import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

import { IconButton, ThemeProvider, Divider } from "@material-ui/core";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import RoomIcon from "@material-ui/icons/Room";

import styles from "./IntroUpdateDialog.module.scss";

import { grayButtonTheme, customButtonBlueGreen } from "../../customThemes";

export default function IntroUpdateDialog({
  isOpen,
  onClose,
  birthPlace,
  residence,
  updateProfilData,
  onChangeBirthPlace,
  onChangeResidence,
}) {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        className={styles.dialog}
      >
        <DialogTitle id="form-dialog-title" className={styles.dialog_title}>
          {t("profilePage.editDetails")}
          <ThemeProvider theme={grayButtonTheme}>
            <IconButton
              color="primary"
              onClick={onClose}
              className={styles.closebtn}
            >
              <CloseIcon />
            </IconButton>
          </ThemeProvider>
        </DialogTitle>
        <Divider />
        <DialogContent className={styles.dialog_content}>
          <h2>{t("profilePage.editIntroHeading")}</h2>
          <p>{t("profilePage.disclaimer")}</p>
          <div className={styles.profile_info}>
            <HomeRoundedIcon />
            <input
              placeholder={t("profilePage.residenceQuestion")}
              value={residence}
              onInput={(ev) => {
                onChangeResidence(ev.target.value);
              }}
            ></input>
          </div>
          <div className={styles.profile_info} value={residence}>
            <RoomIcon />
            <input
              placeholder={t("profilePage.birthPlaceQuestion")}
              value={birthPlace}
              onInput={(ev) => {
                onChangeBirthPlace(ev.target.value);
              }}
            ></input>
          </div>
        </DialogContent>
        <ThemeProvider theme={customButtonBlueGreen}>
          <DialogActions className={styles.dialog_actions}>
            <Button
              color="primary"
              onClick={() => updateProfilData()}
              style={{ fontSize: "14px" }}
            >
              {t("profilePage.save")}
            </Button>
          </DialogActions>
        </ThemeProvider>
      </Dialog>
    </React.Fragment>
  );
}

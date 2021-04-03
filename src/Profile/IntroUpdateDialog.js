import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

import {
  IconButton,
  ThemeProvider,
  Divider,
} from "@material-ui/core";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import RoomIcon from "@material-ui/icons/Room";

import styles from "./IntroUpdateDialog.module.scss";

import { grayButtonTheme, customButtonBlueGreen } from "../customThemes";

export default function IntroUpdateDialog({
  isOpen,
  onClose,
  birthPlace,
  residence,
  updateProfilData,
  onChangeBirthPlace,
  onChangeResidence,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        className={styles.dialog}
      >
        <DialogTitle id="form-dialog-title" className={styles.dialog_title}>
           Edit details
          <ThemeProvider theme={grayButtonTheme}>
            <IconButton color="primary" onClick={onClose} className={styles.closebtn}>
              <CloseIcon />
            </IconButton>
          </ThemeProvider>
        </DialogTitle>
        <Divider/>
        <DialogContent className={styles.dialog_content}>
          <h2>Customise your Intro</h2>
          <p>
            Details that you select will be public and won't be posted to News
            Feed.
          </p>
          <div className={styles.profile_info}>
            <HomeRoundedIcon />
            <input placeholder="Where do you live?" value={residence} onInput={(ev) => {onChangeResidence(ev.target.value)}}></input>
          </div>
          <div className={styles.profile_info} value={residence}>
            <RoomIcon />
            <input placeholder="Where are you from?" value={birthPlace} 
            onInput={(ev) => {onChangeBirthPlace(ev.target.value)}}></input>
          </div>
        </DialogContent>
        <ThemeProvider theme={customButtonBlueGreen}>
          <DialogActions className={styles.dialog_actions}>
            <Button
              color="primary"
              onClick={() => updateProfilData() }
            >
              Save
            </Button>
          </DialogActions>
        </ThemeProvider>
      </Dialog>
    </React.Fragment>
  );
}

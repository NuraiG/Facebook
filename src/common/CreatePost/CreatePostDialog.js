import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import MoodOutlinedIcon from "@material-ui/icons/MoodOutlined";

import { grayButtonTheme, blueGreenTheme, redOrangeTheme } from "../../customThemes";
import styles from "./CreatePostDialog.module.scss";

export default function CreatePostDialog({
  state,
  onClose,
  placeholder,
  text,
  onInput,
  onSubmit,
}) {
  const useStyles = makeStyles(() => ({
    greenBtn: {
      fill: blueGreenTheme.palette.secondary.main,
    },
    blueBtn: {
      fill: blueGreenTheme.palette.primary.main,
    },
    yellowBtn: {
      fill: redOrangeTheme.palette.secondary.main,
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={state}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        className={styles.dialog}
      >
        <DialogTitle id="form-dialog-title" className={styles.dialog_title}>
          Create Post
          <ThemeProvider theme={grayButtonTheme}>
            <IconButton color="primary" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </ ThemeProvider>
        </DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent className={styles.dialog_content}>
            <DialogContentText className={styles.post_author}>
              <Avatar />
              <h3>John Doe</h3>
            </DialogContentText>
            <InputBase
              className={styles.dialog_input}
              inputProps={{ "aria-label": "naked" }}
              fullWidth
              multiline
              rows={4}
              placeholder={placeholder}
              value={text}
              onInput={(ev) => {
                onInput(ev.target.value);
              }}
            />
            <Box className={styles.post_actions}>
              <span>Add to Your Post</span>
              <Box className={styles.action_buttons}>
                <IconButton>
                  <PhotoOutlinedIcon className={classes.greenBtn} />
                </IconButton>
                <IconButton>
                  <LocalOfferOutlinedIcon className={classes.blueBtn} />
                </IconButton>
                <IconButton>
                  <MoodOutlinedIcon className={classes.yellowBtn} />
                </IconButton>
              </Box>
            </Box>
          </DialogContent>
          <ThemeProvider theme={blueGreenTheme}>
            <DialogActions className={styles.dialog_actions}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={onClose}
                fullWidth
                disabled={text.trim().length > 0 ? false : true}
              >
                Post
              </Button>
            </DialogActions>
          </ThemeProvider>
        </form>
      </Dialog>
    </div>
  );
}

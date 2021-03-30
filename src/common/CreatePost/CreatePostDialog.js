import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  makeStyles,
  ThemeProvider,
  Tooltip,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import MoodOutlinedIcon from "@material-ui/icons/MoodOutlined";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";

import {
  grayButtonTheme,
  blueGreenTheme,
  redOrangeTheme,
} from "../../customThemes";
import styles from "./CreatePostDialog.module.scss";

import { useDropzone } from "react-dropzone";

export default function CreatePostDialog({
  state,
  onClose,
  placeholder,
  text,
  onInput,
  onSubmit,
  onTag,
  onDrop,
  files,
  removeImg,
  setShowFeelingsModal,
  showFeelingsModal,
  postFeeling,
  setPostFeeling,
}) {
  const {
    getRootProps: getRootPropsNoClick,
    getInputProps: getInputPropsNoClick,
  } = useDropzone({ noClick: true, onDrop, accept: "image/*" });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

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
          {showFeelingsModal ? "How are you feeling?" : "Create Post"}
          <ThemeProvider theme={grayButtonTheme}>
            <IconButton
              color="primary"
              onClick={
                showFeelingsModal ? () => setShowFeelingsModal(false) : onClose
              }
              className={showFeelingsModal ? styles.back_btn : styles.close_btn}
            >
              <CloseIcon />
              <ArrowBackRoundedIcon />
            </IconButton>
          </ThemeProvider>
        </DialogTitle>
        <form onSubmit={onSubmit}>
          {showFeelingsModal ? (
            <DialogContent className={styles.dialog_content}>
              <div className={styles.feelings_input_wrapper}>
                <input
                  className={styles.feelings_input}
                  type="text"
                  placeholder="How are you feeling?"
                  value={postFeeling}
                  onInput={(ev) => setPostFeeling(ev.target.value)}
                />
              </div>
              <ThemeProvider theme={blueGreenTheme}>
                <Button
                  className={styles.feelings_btn}
                  color="primary"
                  variant="contained"
                  onClick={() => setShowFeelingsModal(false)}
                  fullWidth
                  disabled={postFeeling.trim().length > 0 ? false : true}
                >
                  Select Feeling
                </Button>
              </ThemeProvider>
            </DialogContent>
          ) : (
            <DialogContent className={styles.dialog_content}>
              <Box className={styles.post_author}>
                <Avatar />
                <h3>
                  John Doe
                  {postFeeling.length > 0 ? " is feeling " + postFeeling : ""}
                </h3>
              </Box>
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
              {files.length > 0 &&
                files.map((file) => (
                  <div key={file} className={styles.attached_images_container}>
                    <img alt="" src={file} className={styles.attached_images} />
                    <ThemeProvider theme={grayButtonTheme}>
                      <IconButton
                        color="primary"
                        onClick={() => removeImg(file)}
                        className={styles.remove_img}
                      >
                        <CloseIcon />
                      </IconButton>
                    </ThemeProvider>
                  </div>
                ))}
              <div {...getRootPropsNoClick()} className={styles.drag_file}>
                <input {...getInputPropsNoClick()} />
              </div>
              <Box className={styles.post_actions}>
                <span>Add to Your Post</span>
                <Box className={styles.action_buttons}>
                  <input {...getInputProps()}></input>
                  <Tooltip title="Photo/Video" placement="top">
                    <IconButton {...getRootProps({ className: "dropzone" })}>
                      <PhotoOutlinedIcon className={classes.greenBtn} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Tag Friends" placement="top">
                    <IconButton onClick={onTag}>
                      <LocalOfferOutlinedIcon className={classes.blueBtn} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Feeling" placement="top">
                    <IconButton onClick={() => setShowFeelingsModal(true)}>
                      <MoodOutlinedIcon className={classes.yellowBtn} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </DialogContent>
          )}

          <ThemeProvider theme={blueGreenTheme}>
            <DialogActions className={styles.dialog_actions}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={onClose}
                fullWidth
                disabled={
                  text.trim().length > 0 ||
                  files.length > 0 ||
                  postFeeling.trim().length > 0
                    ? false
                    : true
                }
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

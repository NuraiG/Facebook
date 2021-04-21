import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { MentionsInput, Mention } from "react-mentions";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  ThemeProvider,
  Tooltip,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import MoodOutlinedIcon from "@material-ui/icons/MoodOutlined";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";

import Picker from "emoji-picker-react";

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
  isPostBeingEdited,
  postTaggedUsers,
  setPostTaggedUsers,
  isEmojiPickerOpen,
  setEmojiPickerOpen,
  onEmojiClick,
}) {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const allUsers = useSelector((state) => state.allUsers.allUsers);
  const { t } = useTranslation();

  const {
    getRootProps: getRootPropsNoClick,
    getInputProps: getInputPropsNoClick,
  } = useDropzone({ noClick: true, onDrop, accept: "image/*" });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  let filterUsers = (query, callback) => {
    return query.trim().length === 0
      ? callback([])
      : callback(
          allUsers
            .filter((user) =>
              (user.firstName + " " + user.lastName)
                .toLowerCase()
                .includes(query.toLowerCase())
            )
            .map((user) => ({
              display: user.firstName + " " + user.lastName,
              id: user.id,
            }))
        );
  };

  const onAdd = (id, display) => {
    setPostTaggedUsers([...postTaggedUsers, { id, fullName: display }]);
  };

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
    grayBtn: {
      fill: grayButtonTheme.palette.secondary.main,
    },
  }));

  let style = {
    input: {
      overflow: "auto",
    },
  };

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={state}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        className={`${styles.dialog} ${currentUser.darkModeTurnedOn ? "dark" : "light"}`}
      >
        <DialogTitle id="form-dialog-title" className={styles.dialog_title}>
          {showFeelingsModal
            // ? "How are you feeling?"
            ? t("post.postHeaderFeeling")
            : isPostBeingEdited
            ? t("post.postHeaderEdit")
            : t("post.postHeaderCreate")}
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
                  placeholder={t("post.postHeaderFeeling")}
                  value={postFeeling}
                  onInput={(ev) => setPostFeeling(ev.target.value)}
                />
              </div>
              <ThemeProvider theme={blueGreenTheme}>
                <Button
                  className={styles.feelings_btn}
                  color="primary"
                  variant="contained"
                  style={{ fontSize: "14px" }}
                  onClick={() => setShowFeelingsModal(false)}
                  fullWidth
                  disabled={postFeeling.trim().length > 0 ? false : true}
                >
                  {t("post.selectFeelingBtn")}
                </Button>
              </ThemeProvider>
            </DialogContent>
          ) : (
            <DialogContent className={styles.dialog_content}>
              <Box className={styles.post_author}>
                <Avatar src={currentUser.profile_image} />
                <h3>
                  {currentUser.firstName} {currentUser.lastName}
                  {postFeeling.length > 0 ? t("post.feeling") + postFeeling : ""}
                </h3>
              </Box>
              <MentionsInput
                className={styles.dialog_input}
                placeholder={placeholder}
                value={text}
                allowSpaceInQuery={true}
                style={style}
                onChange={(ev) => {
                  onInput(ev.target.value);
                }}
              >
                <Mention
                  displayTransform={(id, display) => `@${display}`}
                  trigger=" @"
                  appendSpaceOnAdd={true}
                  data={filterUsers}
                  onAdd={onAdd}
                />
              </MentionsInput>
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
              {isEmojiPickerOpen ? (
                <Picker onEmojiClick={onEmojiClick} />
              ) : null}
              <Box className={styles.emoji_button}>
                <Tooltip title={<h6>Emoji</h6>} placement="top">
                  <IconButton
                    onClick={() => {
                      setEmojiPickerOpen(!isEmojiPickerOpen);
                    }}
                  >
                    <SentimentSatisfiedOutlinedIcon
                      fullwidt="large"
                      className={classes.grayBtn}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box className={styles.post_actions}>
                <span>{t("post.addToPost")}</span>
                <Box className={styles.action_buttons}>
                  <input {...getInputProps()}></input>
                  <Tooltip title={<h6>Photo/Video</h6>} placement="top">
                    <IconButton {...getRootProps({ className: "dropzone" })}>
                      <PhotoOutlinedIcon className={classes.greenBtn} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={<h6>{t("post.tagBtn")}</h6>} placement="top">
                    <IconButton onClick={onTag}>
                      <LocalOfferOutlinedIcon className={classes.blueBtn} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={<h6>{t("post.feelingBtn")}</h6>} placement="top">
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
                style={{ fontSize: "14px" }}
                disabled={
                  text.trim().length > 0 ||
                  files.length > 0 ||
                  postFeeling.trim().length > 0
                    ? false
                    : true
                }
              >
                {isPostBeingEdited ? t("post.save") : t("post.post")}
              </Button>
            </DialogActions>
          </ThemeProvider>
        </form>
      </Dialog>
    </div>
  );
}

import React, { useCallback, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Grid,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";

import styles from "./CreatePost.module.scss";

import {
  grayTheme,
  grayButtonTheme,
  blueGreenTheme,
  redOrangeTheme,
} from "../../customThemes";

import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import MoodOutlinedIcon from "@material-ui/icons/MoodOutlined";
import CreatePostDialog from "./CreatePostDialog";

import { useDropzone } from "react-dropzone";
import { createPost } from "../../service";

// let possiblePlaceholders = [
//   `What's on your mind, ${currentUser.firstName}?`,
//   `Write something to ${user.firstName}...`,
// ];

export default function CreatePost({ currentUser, target }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  let [attachedFiles, setAttachedFiles] = useState([]);
  const onDrop = useCallback(
    (newFiles) => {
      // TODO: upload new image and push its url into the attachedFiles array
      setAttachedFiles([...attachedFiles, ...newFiles]);
      setIsDialogOpen(true);
    },
    [attachedFiles]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const [postValue, setPostValue] = useState("");
  const [postFeeling, setPostFeeling] = useState("");
  const [showFeelingsModal, setShowFeelingsModal] = useState(false);
  const openFeelingsModal = () => {
    setShowFeelingsModal(true);
    setIsDialogOpen(true);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    // send request to create post with postValue.trim()
    createPost({
      createdById: currentUser.id,
      createdByFullName: currentUser.firstName + " " + currentUser.lastName,
      createdByPic: currentUser.profilePic,
      postTargetId: target.id,
      postTargetDesc: "wall",
      attachedImages: attachedFiles,
      content: postValue.trim(),
      feeling: postFeeling.trim(),
    })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    setPostValue("");
    setAttachedFiles([]);
    setPostFeeling("");
  };

  const onTag = () => {
    setPostValue(postValue + " @");
    // TODO: on ' @' start suggesting friends and filter when typing
  };

  const useStyles = makeStyles(() => ({
    btnContainer: {
      borderTop: 1,
      borderColor: grayButtonTheme.palette.secondary.main,
      borderStyle: "solid",
      paddingTop: "10px",
      marginTop: "10px",
    },
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

  let placeholder =
    currentUser.id === target.id
      ? `What's on your mind, ${currentUser.firstName}?`
      : `Write something to ${target.firstName}...`;

  return (
    <ThemeProvider theme={grayTheme}>
      <Card color="secondary" className={styles.card}>
        <div className={styles.form_wrapper}>
          <Avatar src={currentUser.profilePic} />
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder={placeholder}
              onClick={handleDialogOpen}
              value={postValue}
              readOnly
            />
            <button type="submit"></button>
          </form>
        </div>
        <ThemeProvider theme={grayButtonTheme}>
          <Grid
            container
            className={`${styles.post_actions} ${classes.btnContainer}`}
          >
            <Grid item xs={4}>
              <input {...getInputProps()}></input>
              <Button
                {...getRootProps({ className: "dropzone" })}
                className={styles.actions_btn}
                fullWidth
                color="secondary"
                startIcon={
                  <PhotoOutlinedIcon
                    fontSize="large"
                    className={classes.greenBtn}
                  />
                }
              >
                Photo/Video
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                className={styles.actions_btn}
                fullWidth
                color="secondary"
                startIcon={
                  <LocalOfferOutlinedIcon className={classes.blueBtn} />
                }
                onClick={onTag}
              >
                Tag
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={openFeelingsModal}
                className={styles.actions_btn}
                fullWidth
                color="secondary"
                startIcon={<MoodOutlinedIcon className={classes.yellowBtn} />}
              >
                Feeling
              </Button>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Card>
      <CreatePostDialog
        state={isDialogOpen}
        onClose={handleDialogClose}
        placeholder={placeholder}
        text={postValue}
        onInput={setPostValue}
        onSubmit={onSubmit}
        onTag={onTag}
        onDrag={setAttachedFiles}
        files={attachedFiles}
        setShowFeelingsModal={setShowFeelingsModal}
        showFeelingsModal={showFeelingsModal}
        postFeeling={postFeeling}
        setPostFeeling={setPostFeeling}
      />
    </ThemeProvider>
  );
}

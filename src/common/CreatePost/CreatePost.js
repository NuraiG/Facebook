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

import { currentUser } from "../../staticData";

import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import MoodOutlinedIcon from "@material-ui/icons/MoodOutlined";
import CreatePostDialog from "./CreatePostDialog";

import { useDropzone } from "react-dropzone";

// let possiblePlaceholders = [
//   `What's on your mind, ${currentUser.firstName}?`,
//   `Write something to ${user.firstName}...`,
// ];

export default function CreatePost({ placeholder }) {
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
      setAttachedFiles([...attachedFiles, ...newFiles]);
      setIsDialogOpen(true);
    },
    [attachedFiles]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const [postValue, setPostValue] = useState("");
  const onSubmit = (ev) => {
    ev.preventDefault();
    // TODO: send request to create post with postValue.trim()
    setPostValue("");
    setAttachedFiles([]);
  };

  const onTag = () => {
    setPostValue(postValue + " @");
    // on ' @' start suggesting friends and filter when typing
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
      />
    </ThemeProvider>
  );
}

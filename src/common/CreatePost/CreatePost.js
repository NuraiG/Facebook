import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";

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
  grayThemeDark,
} from "../../customThemes";

import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import MoodOutlinedIcon from "@material-ui/icons/MoodOutlined";
import CreatePostDialog from "./CreatePostDialog";

import { addImagesToUser, createPost } from "../../firebase/service";
import { storage } from "../../firebase/firebase";


export default function CreatePost({ target }) {
  const currentUser = useSelector(state => state.currentUser.currentUser);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [postValue, setPostValue] = useState("");
  const [postFeeling, setPostFeeling] = useState("");
  const [postTaggedUsers, setPostTaggedUsers] = useState([]);
  const [showFeelingsModal, setShowFeelingsModal] = useState(false);
  const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [chosenEmoji,setChosenEmoji]=useState(null);
  const { t } = useTranslation();

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const removeFromAttachedFiles = (file) => {
    let copy = [...attachedFiles]
    let index = copy.indexOf(file);
    copy.splice(index, 1);
    setAttachedFiles(copy);
  }
  const onEmojiClick = (event, emojiObject) => {
    let add;
    setChosenEmoji(emojiObject.emoji);
    chosenEmoji ? add = postValue + " " + chosenEmoji + " " : add = postValue;
    setPostValue(add);
};

  const onDrop = useCallback(
    (newFiles) => {
      newFiles.forEach((file) => {
        const uploadTask = storage
          .ref()
          .child("images/" + currentUser.id + "_" + Date.now())
          .put(file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log("File available at", downloadURL);
              setAttachedFiles([...attachedFiles, downloadURL]);
            });
          }
        );
      });
      setIsDialogOpen(true);
    },
    [attachedFiles, currentUser.id]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

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
      createdByPic: currentUser.profile_image || "",
      postTargetId: target.id,
      postTargetDesc: "wall",
      attachedImages: attachedFiles,
      content: postValue.trim(),
      feeling: postFeeling.trim(),
      taggedUsers: postTaggedUsers,
    })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    if (attachedFiles.length > 0) {
      addImagesToUser(currentUser.id, attachedFiles);
      setAttachedFiles([]);
    }
    setPostValue("");
    setPostFeeling("");
  };

  const onTag = () => {
    setPostValue(postValue + " @");
    setIsDialogOpen(true);
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
      ? t("post.placeholderCurrentUser", {firstName: currentUser.firstName})
      : t("post.placeholderOtherUser", {firstName: currentUser.firstName});

  return (
    <ThemeProvider theme={currentUser.darkModeTurnedOn ? grayThemeDark : grayTheme}>
      <Card color="secondary" className={styles.card}>
        <div className={styles.form_wrapper}>
          <Avatar src={currentUser.profile_image} />
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
                {t("post.photoBtn")}
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
                {t("post.tagBtn")}
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
                {t("post.feelingBtn")}
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
        onDrop={onDrop}
        files={attachedFiles}
        removeImg={removeFromAttachedFiles}
        setShowFeelingsModal={setShowFeelingsModal}
        showFeelingsModal={showFeelingsModal}
        postFeeling={postFeeling}
        setPostFeeling={setPostFeeling}
        postTaggedUsers={postTaggedUsers}
        setPostTaggedUsers={setPostTaggedUsers}
        isEmojiPickerOpen={isEmojiPickerOpen}
        setEmojiPickerOpen = {setEmojiPickerOpen}
        onEmojiClick={onEmojiClick}
      />
    </ThemeProvider>
  );
}

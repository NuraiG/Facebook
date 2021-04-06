import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Post.module.scss";

import { Button, IconButton, makeStyles, Popper } from "@material-ui/core";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { grayTheme } from "../../customThemes";
import { deletePost, updatePost } from "../../service";
import { storage } from "../../firebase";
import CreatePostDialog from "../CreatePost/CreatePostDialog";

const useStyles = makeStyles(() => ({
  paper: {
    padding: grayTheme.spacing(1),
    backgroundColor: grayTheme.palette.secondary.main,
    borderRadius: "8px",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.5) 0px 0px 0px 1px inset",
  },
}));

export default function PostOptionsBtn({ postObj }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState(postObj.attachedImages);
  const [postValue, setPostValue] = useState(postObj.content);
  const [postFeeling, setPostFeeling] = useState(postObj.feeling);
  const [showFeelingsModal, setShowFeelingsModal] = useState(false);
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const removeFromAttachedFiles = (file) => {
    let copy = [...attachedFiles];
    let index = copy.indexOf(file);
    copy.splice(index, 1);
    setAttachedFiles(copy);
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

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const onDelete = () => {
    deletePost(postObj.id)
      .then(console.log("success"))
      .catch((err) => console.log(err));
    setAnchorEl(null);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    updatePost(postObj.id, {
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
  };

  const onTag = () => {
    setPostValue(postValue + " @");
  };

  const open = Boolean(anchorEl);
  const id = open ? postObj.id + "_actions" : undefined;
  const classes = useStyles();
  return (
    <>
      <IconButton
        className={styles.more_btn}
        aria-describedby={id}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
      >
        <div className={`${classes.paper} ${styles.post_actions_popper}`}>
          <Button fullWidth onClick={onDelete} className={styles.post_actions_btn}>
            Delete post
          </Button>
          <Button fullWidth onClick={handleDialogOpen} className={styles.post_actions_btn}>
            Edit post
          </Button>
        </div>
      </Popper>
      <CreatePostDialog
        state={isDialogOpen}
        onClose={handleDialogClose}
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
        isPostBeingEdited={true}
      />
    </>
  );
}

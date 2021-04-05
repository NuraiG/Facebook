import React, { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AvatarComponent from "../common/SmallAvatar/AvatarComponent";
import CreatePostDialog from "../common/CreatePost/CreatePostDialog";

import { createPost, logout } from "../service";
import { storage } from "../firebase";

import styles from "./Header.module.scss";
import { grayButtonTheme } from "../customThemes";

// Material-UI
import {
  IconButton,
  ThemeProvider,
  Tooltip,
  Card,
  Button,
} from "@material-ui/core";

// Icons
import AddIcon from "@material-ui/icons/Add";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import PopperComponent from "./PopperComponent";
import NotificationsPopupContent from "./NotificationsPopupContent";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

export default function HeaderRight() {
  const [openNotifications, setOpenNotifications] = useState(false);
  const notificationsRef = useRef(null);

  const [openAccount, setOpenAccount] = useState(false);
  const anchorRef = useRef(null);

  const currentUser = useSelector(state => state.currentUser.currentUser);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [postValue, setPostValue] = useState("");
  const [postFeeling, setPostFeeling] = useState("");
  const [postTaggedUsers, setPostTaggedUsers] = useState([]);
  const [showFeelingsModal, setShowFeelingsModal] = useState(false);

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

  const onSubmit = (ev) => {
    ev.preventDefault();
    createPost({
      createdById: currentUser.id,
      createdByFullName: currentUser.firstName + " " + currentUser.lastName,
      createdByPic: currentUser.profile_image || "",
      postTargetId: currentUser.id,
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
      // TODO: add images to profile
      setAttachedFiles([]);
    }
    setPostValue("");
    setPostFeeling("");
  };

  const onTag = () => {
    setPostValue(postValue + " @");
    setIsDialogOpen(true);
  };

  const handleOpenNotifications = () => {
    console.log(notificationsRef);
    setOpenNotifications(true);
  };

  const handleCloseNotifications = (event) => {
    if (
      notificationsRef.current &&
      notificationsRef.current.contains(event.target)
    ) {
      return;
    }
    setOpenNotifications(false);
  };

  const handleOpenLogout = () => {
    console.log(anchorRef);
    setOpenAccount(true);
  };

  const handleCloseLogout = (ev) => {
    // if (
    // anchorRef.current &&
    // anchorRef.current.contains(ev.target)
    // ) {
    // return;
    // }
    setOpenAccount(false);
  };

  const logOut = () => {
    logout();
  };
  return (
    <div className={styles.header__right}>
      <ThemeProvider theme={grayButtonTheme}>
        <AvatarComponent
          className={`${styles.header__info}`}
          showFullName={false}
        />
        <Tooltip title={<h6>Create</h6>} placement="bottom">
          <IconButton
            color="primary"
            className={`${styles.icon_btn}`}
            onClick={handleDialogOpen}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <CreatePostDialog
          state={isDialogOpen}
          onClose={handleDialogClose}
          placeholder={`What's on your mind, ${currentUser.firstName}?`}
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
        />
        <Tooltip title={<h6>Messenger</h6>} placement="bottom">
          <IconButton
            color="primary"
            className={`${styles.icon_btn}`}
            // ref={anchorRef}
            // aria-controls={open ? "menu-list-grow" : undefined}
            // aria-haspopup="true"
            // onClick={handleOpen}
          >
            <ChatRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={<h6>Notifications</h6>} placement="bottom">
          <IconButton
            color="primary"
            className={`${styles.icon_btn}`}
            ref={notificationsRef}
            aria-controls={openNotifications ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleOpenNotifications}
          >
            <NotificationsRoundedIcon />
          </IconButton>
        </Tooltip>
        <PopperComponent
          open={openNotifications}
          anchorEl={notificationsRef.current ? notificationsRef : undefined}
          handleClose={handleCloseNotifications}
        >
          <NotificationsPopupContent />
        </PopperComponent>
        <Tooltip title={<h6>Account</h6>} placement="bottom">
          <IconButton
            color="primary"
            className={`${styles.arrow_btn}`}
            ref={anchorRef}
            aria-controls={openAccount ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleOpenLogout}
          >
            <ArrowDropDownRoundedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <PopperComponent
          open={openAccount}
          anchorEl={anchorRef.current}
          handleClose={handleCloseLogout}
        >
          <Card>
            <Link to="/login">
              <Button
                onClick={() => logOut()}
                fullWidth
                style={{ fontSize: "14px" }}
                startIcon={<ExitToAppRoundedIcon />}
              >
                Log Out
              </Button>
            </Link>
          </Card>
        </PopperComponent>
      </ThemeProvider>
    </div>
  );
}

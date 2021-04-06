import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import i18n from "../localization/i18n";
import { useTranslation } from "react-i18next";

import AvatarComponent from "../common/SmallAvatar/AvatarComponent";
import CreatePostDialog from "../common/CreatePost/CreatePostDialog";
import PopperComponent from "./PopperComponent/PopperComponent";
import NotificationButton from "./Notifications/NotificationButton";

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
  Switch,
} from "@material-ui/core";

// Icons
import AddIcon from "@material-ui/icons/Add";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { logOutUser } from "../Profile/CurrentUser.actions";

export default function HeaderRight() {
  const [openAccount, setOpenAccount] = useState(false);
  const anchorRef = useRef(null);

  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [postValue, setPostValue] = useState("");
  const [postFeeling, setPostFeeling] = useState("");
  const [postTaggedUsers, setPostTaggedUsers] = useState([]);
  const [showFeelingsModal, setShowFeelingsModal] = useState(false);
  const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [chosenEmoji,setChosenEmoji]=useState(null);
  const [isInEnglish, setIsInEnglish] = useState(true);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  const onEmojiClick = (event, emojiObject) => {
    let add;
    setChosenEmoji(emojiObject.emoji);
    chosenEmoji ? add = postValue + " " + chosenEmoji + " " : add = postValue;
    setPostValue(add);
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

  const handleOpenLogout = () => {
    console.log(anchorRef);
    setOpenAccount(true);
  };

  const handleCloseLogout = (ev) => {
    setOpenAccount(false);
  };

  const logOut = () => {
    logout()
      .then(() => {
        dispatch(logOutUser());
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };

  const toggleChecked = () => {
    let currentLanguage = isInEnglish ? "bg" : "en";
    setIsInEnglish(!isInEnglish);
    i18n.changeLanguage(currentLanguage);
  };
  return (
    <div className={styles.header__right}>
      <ThemeProvider theme={grayButtonTheme}>
        <AvatarComponent
          className={`${styles.header__info}`}
          showFullName={false}
        />
        <Tooltip title={<h6>{t("header.create")}</h6>} placement="bottom">
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
          placeholder={t("post.placeholderCurrentUser", {
            firstName: currentUser.firstName,
          })}
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
        <Tooltip title={<h6>{t("header.messenger")}</h6>} placement="bottom">
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
        <NotificationButton />
        <Tooltip title={<h6>{t("header.account")}</h6>} placement="bottom">
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
                {t("header.logout")}
              </Button>
            </Link>
          </Card>
          <Card className={styles.language_container}>
            <h4>{t("header.languageChange")}</h4>
            <div className={styles.language_switch}>
              <div>en</div>
              <Switch checked={!isInEnglish} onChange={toggleChecked} />
              <div>bg</div>
            </div>
          </Card>
        </PopperComponent>
      </ThemeProvider>
    </div>
  );
}

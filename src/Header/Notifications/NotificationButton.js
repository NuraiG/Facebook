import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import NotificationsPopupContent from "./NotificationsPopupContent";
import PopperComponent from "../PopperComponent/PopperComponent";

import styles from "../Header.module.scss";

import { IconButton, Tooltip } from "@material-ui/core";

import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import { NOTIFICATION_TYPES } from "../../constants/constants";
import {
  getAllComments,
  getAllPosts,
  getMyFriendRequests,
  readNotifications,
} from "../../firebase/service";
import { updateUserProfile } from "../../Profile/CurrentUser.actions";
import { getServerTime } from "../../utils/timeUtils";

export default function NotificationButton() {
  const [openNotifications, setOpenNotifications] = useState(false);
  const notificationsRef = useRef(null);

  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const allUsers = useSelector((state) => state.allUsers.allUsers);
  const [allNotifications, setAllNotifications] = useState([]);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleOpenNotifications = () => {
    setOpenNotifications(true);
    dispatch(
      updateUserProfile({
        ...currentUser,
        notificationsLastRead: getServerTime(),
      })
    );
    readNotifications(currentUser.id);
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

  const getNewNotifications = () => {
    return allNotifications.filter(
      (notification) =>
        notification.timestamp?.toDate() >
        currentUser.notificationsLastRead?.toDate()
    );
  };

  useEffect(() => {
    const addNotificationsToAll = (notificationsToAdd) => {
      let allNotificationIds = allNotifications.map((notif) => notif.id);
      let newNotifications = notificationsToAdd.filter(
        (fr) => allNotificationIds.indexOf(fr.id) === -1
      );
      if (newNotifications.length) {
        newNotifications = newNotifications.map((el) => ({
          ...el,
          fromUser: {
            ...allUsers.find(
              (user) => user.id === el.from || user.id === el.createdById
            ),
          },
        }));
        setAllNotifications([...allNotifications, ...newNotifications]);
      }
    };

    if (allUsers && currentUser.id) {
      getMyFriendRequests(currentUser.id).onSnapshot((snapshot) => {
        let allFriendRequests = [];
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            allFriendRequests.push({
              ...change.doc.data(),
              id: change.doc.id,
              type: NOTIFICATION_TYPES.FRIEND_REQUEST,
            });
          }
          if (change.type === "removed") {
            setAllNotifications(
              allNotifications.filter((notif) => notif.id !== change.doc.id)
            );
          }
        });
        addNotificationsToAll(allFriendRequests);
      });

      getAllPosts(currentUser.id).onSnapshot((snapshot) => {
        let allPostsOnMyWall = [];
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // check if it's on current user's wall and it's not written by them
            if (
              change.doc.data().postTargetId === currentUser.id &&
              change.doc.data().createdById !== currentUser.id
            ) {
              allPostsOnMyWall.push({
                ...change.doc.data(),
                id: change.doc.id,
                type: NOTIFICATION_TYPES.NEW_POST_ON_WALL,
              });
            } else if (
              change.doc
                .data()
                .taggedUsers.find((user) => user.id === currentUser.id)
            ) {
              allPostsOnMyWall.push({
                ...change.doc.data(),
                id: change.doc.id,
                type: NOTIFICATION_TYPES.TAGGED_ON_POST,
              });
            }
          }
          if (
            (change.type === "modified" &&
              change.doc.data().isDeleted === true) ||
            change.type === "removed"
          ) {
            // check if post has been deleted
            setAllNotifications(
              allNotifications.filter((notif) => notif.id !== change.doc.id)
            );
          }
        });
        addNotificationsToAll(allPostsOnMyWall);
      });

      getAllComments().onSnapshot((snapshot) => {
        let allCommentsOnMyPosts = [];
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // check if it's on current user's post and it's not written by them
            if (
              change.doc.data().postAuthorId === currentUser.id &&
              change.doc.data().createdById !== currentUser.id
            ) {
              allCommentsOnMyPosts.push({
                ...change.doc.data(),
                id: change.doc.id,
                type: NOTIFICATION_TYPES.NEW_COMMENT_ON_POST,
              });
            }
          }
          if (change.type === "removed") {
            setAllNotifications(
              allNotifications.filter((notif) => notif.id !== change.doc.id)
            );
          }
        });
        addNotificationsToAll(allCommentsOnMyPosts);
      });
    }
  }, [currentUser.id, allNotifications, allUsers]);

  return (
    <>
      <Helmet>
        <title>
          {getNewNotifications().length === 0
            ? "Facebook"
            : "(" + getNewNotifications().length + ") Facebook"}
        </title>
      </Helmet>
      <Tooltip title={<h6>{t("header.notifications")}</h6>} placement="bottom">
        <IconButton
          color="primary"
          className={`${styles.icon_btn} ${styles.notification_btn}`}
          ref={notificationsRef}
          aria-controls={openNotifications ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleOpenNotifications}
        >
          <NotificationsRoundedIcon />
          {getNewNotifications().length > 0 ? (
            <div className={styles.notifications_count}>
              <div>{getNewNotifications().length}</div>
            </div>
          ) : null}
        </IconButton>
      </Tooltip>
      <PopperComponent
        open={openNotifications}
        anchorEl={notificationsRef.current ? notificationsRef : undefined}
        handleClose={handleCloseNotifications}
      >
        <NotificationsPopupContent allNotifications={allNotifications} />
      </PopperComponent>
    </>
  );
}

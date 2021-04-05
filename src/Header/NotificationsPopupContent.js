import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NOTIFICATION_TYPES } from "../constants";
import { getAllComments, getAllPosts, getMyFriendRequests } from "../service";

import styles from "./PopperComponent.module.scss";

import { Avatar, Card } from "@material-ui/core";
import {
  compareObjByDBTimestamp,
  getServerTime,
  getShortDate,
} from "../utils/timeUtils";

export default function NotificationsPopupContent() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const allUsers = useSelector((state) => state.allUsers.allUsers);
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    if (allUsers) {
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
        let allNotificationIds = allNotifications.map((notif) => notif.id);
        let newNotifications = allFriendRequests.filter(
          (fr) => allNotificationIds.indexOf(fr.id) === -1
        );
        if (newNotifications.length) {
          newNotifications = newNotifications.map((el) => ({
            ...el,
            fromUser: { ...allUsers.find((user) => user.id === el.from) },
          }));
          setAllNotifications([...allNotifications, ...newNotifications]);
        }
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
        // get all notification ids and filter only the new notifications
        let allNotificationIds = allNotifications.map((notif) => notif.id); // array
        let newNotifications = allPostsOnMyWall.filter(
          (fr) => allNotificationIds.indexOf(fr.id) === -1
        );
        // if there are any new notifications
        if (newNotifications.length) {
          newNotifications = newNotifications.map((el) => ({
            ...el,
            fromUser: {
              ...allUsers.find((user) => user.id === el.createdById),
            },
          }));
          setAllNotifications([...allNotifications, ...newNotifications]);
        }
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
        // get all notification ids and filter only the new notifications
        let allNotificationIds = allNotifications.map((notif) => notif.id);
        let newNotifications = allCommentsOnMyPosts.filter(
          (fr) => allNotificationIds.indexOf(fr.id) === -1
        );
        // if there are any new notifications
        if (newNotifications.length) {
          newNotifications = newNotifications.map((el) => ({
            ...el,
            fromUser: {
              ...allUsers.find((user) => user.id === el.createdById),
            },
          }));
          setAllNotifications([...allNotifications, ...newNotifications]);
        }
      });
    }
  }, [currentUser.id, allNotifications, allUsers]);

  return (
    <div>
      {allNotifications.length > 0 ? (
        allNotifications.sort(compareObjByDBTimestamp).map((notification) => {
          return (
            <Card key={notification.id} className={styles.card}>
              <div className={styles.content_wrapper}>
                <Link to={`/profile/${notification.fromUser.id}`}>
                  <Avatar
                    src={notification.fromUser.profile_image}
                    className={styles.card_avatar}
                  />
                </Link>
                <span>
                  <Link to={`/profile/${notification.fromUser.id}`}>
                    {notification.fromUser.firstName}{" "}
                    {notification.fromUser.lastName}
                  </Link>
                  {notification.type === NOTIFICATION_TYPES.FRIEND_REQUEST
                    ? " sent you a friend request"
                    : notification.type === NOTIFICATION_TYPES.NEW_POST_ON_WALL
                    ? " posted on your wall"
                    : notification.type ===
                      NOTIFICATION_TYPES.NEW_COMMENT_ON_POST
                    ? " commented on your post"
                    : " tagged you in a post"}
                </span>
              </div>
              <div className={styles.timestamp}>
                {getShortDate(
                  getServerTime()?.toDate(),
                  new Date(notification.timestamp?.toDate())
                )}
              </div>
            </Card>
          );
        })
      ) : (
        <div className={styles.empty_notifications}>
          You have no notifications yet
        </div>
      )}
    </div>
  );
}

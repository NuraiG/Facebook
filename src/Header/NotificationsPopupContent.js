import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NOTIFICATION_TYPES } from "../constants";
import { getAllPosts, getMyFriendRequests } from "../service";

export default React.memo(function NotificationsPopupContent() {
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
          if (change.type === "modified") {
            // i think we don't need notifications on modifications
            console.log("Modified request: ", change.doc.data());
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
            console.log("postchange ", change.doc.data());
            
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
            }
          }
          if (change.type === "modified") {
            // if it's a post of the current user and someone commented/liked
            
            // check if post has been deleted
            if (change.doc.data().isDeleted === true) {
              setAllNotifications(
                allNotifications.filter((notif) => notif.id !== change.doc.id)
              );
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
        let newNotifications = allPostsOnMyWall.filter(
          (fr) => allNotificationIds.indexOf(fr.id) === -1
        );
        // if there are any new notifications
        if (newNotifications.length) {
          newNotifications = newNotifications.map((el) => ({
            ...el,
            fromUser: { ...allUsers.find((user) => user.id === el.createdById) },
          }));
          setAllNotifications([...allNotifications, ...newNotifications]);
        }
      });
    }
  }, [currentUser.id, allNotifications, allUsers]);

  return (
    <div>
      {allNotifications.map((notification) => {
        if (notification.type === NOTIFICATION_TYPES.FRIEND_REQUEST) {
          return (
            <div key={notification.id}>
              <Avatar src={notification.fromUser.profile_picture} />
              {notification.fromUser.firstName} {notification.fromUser.lastName}{" "}
              sent you a friend request
            </div>
          );
        }
        if (notification.type === NOTIFICATION_TYPES.NEW_POST_ON_WALL) {
          return (
            <div key={notification.id}>
              <Avatar src={notification.fromUser.profile_picture} />
              {notification.fromUser.firstName} {notification.fromUser.lastName}{" "}
              posted on your wall
            </div>
          );
        }
        return null;
      })}
    </div>
  );
});

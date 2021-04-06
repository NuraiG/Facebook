import React from "react";
import { Link } from "react-router-dom";
import { NOTIFICATION_TYPES } from "../../constants";

import styles from "../PopperComponent/PopperComponent.module.scss";

import { Avatar, Card } from "@material-ui/core";
import {
  compareObjByDBTimestamp,
  getServerTime,
  getShortDate,
} from "../../utils/timeUtils";

export default function NotificationsPopupContent({ allNotifications }) {
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

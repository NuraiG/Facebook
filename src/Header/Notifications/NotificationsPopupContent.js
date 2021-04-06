import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NOTIFICATION_TYPES } from "../../constants/constants";

import styles from "../PopperComponent/PopperComponent.module.scss";

import { Avatar, Card } from "@material-ui/core";
import {
  compareObjByDBTimestamp,
  getServerTime,
  getShortDate,
} from "../../utils/timeUtils";

export default function NotificationsPopupContent({ allNotifications }) {
  const { t } = useTranslation();

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
                    ? t("header.notificationFriendInvite")
                    : notification.type === NOTIFICATION_TYPES.NEW_POST_ON_WALL
                    ? t("header.notificationPost")
                    : notification.type ===
                      NOTIFICATION_TYPES.NEW_COMMENT_ON_POST
                    ? t("header.notificationComment")
                    : t("header.notificationTag")}
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
          {t("header.notificationsEmpty")}
        </div>
      )}
    </div>
  );
}

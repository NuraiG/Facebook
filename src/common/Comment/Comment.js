import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Comment.module.scss";

import { getServerTime, getShortDate } from "../../utils/timeUtils";

import { truncateString } from "../../utils/utils";
import { MAX_COMMENT_LENGTH } from "../../constants/constants";
import { likeCommentRequest } from "../../service";

import FbImageLibrary from 'react-fb-image-grid';

import { Avatar, Tooltip } from "@material-ui/core";

import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

export default function Comment({ commentObj }) {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const { t } = useTranslation();

  // get the time for the post, formatted based on how long ago it was made
  let timeToDisplay = getShortDate(
    getServerTime()?.toDate(),
    new Date(commentObj.timestamp?.toDate())
  );
  // need this for the date tooltip
  let fullDatePrettified = new Date(
    commentObj.timestamp?.toDate()
  ).toUTCString();

  let checkIfUserHasLiked = () => {
    return commentObj.likes.some((id) => id === currentUser.id);
  };
  const [isLiked, setIsLiked] = useState(checkIfUserHasLiked());
  // to like or unlike the comment
  const toggle = useCallback(() => setIsLiked(!isLiked), [isLiked, setIsLiked]);

  const addLikes = () => {
    likeCommentRequest(commentObj.id, currentUser.id, !isLiked);
    toggle();
  };

  let [truncatedContent, setTruncatedContent] = useState(
    truncateString(commentObj.content, MAX_COMMENT_LENGTH)
  );
  let isStringTruncated =
    truncatedContent !== commentObj.content ? true : false;

  let [wholeContentIsShown, setWholeContentIsShown] = useState(
    !isStringTruncated
  );
  return (
    <div className={styles.commentWrapper}>
      <div className={styles.imageWrapper}>
        <Link to={`/profile/${commentObj.createdById}`}>
          <Avatar
            alt={commentObj.createdByFullName}
            src={commentObj.createdByPic}
          />
        </Link>
      </div>
      <div className={styles.comment}>
        <div className={styles.commentBody}>
          <p>{commentObj.createdByFullName}</p>
          <div>
            {truncatedContent}
            {!wholeContentIsShown && isStringTruncated && (
              <span
                className={styles.expand_content}
                onClick={() => {
                  setTruncatedContent(commentObj.content);
                  setWholeContentIsShown(true);
                }}
              >
                {t("comment.seeMore")}
              </span>
            )}
            { commentObj.attachedImages ?  <FbImageLibrary images={commentObj.attachedImages} countFrom={2}/> : ""}
          </div>
          {commentObj.likes.length ? (
            <div className={styles.likes}>
              <div className={styles.likeicon}>
                <ThumbUpAltIcon fontSize="small" />
              </div>
              <p>{commentObj.likes.length}</p>
            </div>
          ) : null}{" "}
        </div>
        {isLiked ? (
          <button onClick={() => addLikes()}><h6>{t("comment.unlike")}</h6></button>
        ) : (
          <button onClick={() => addLikes()}><h6>{t("comment.like")}</h6></button>
        )}{" "}
        <Tooltip title={<h6>{fullDatePrettified}</h6>} placement="bottom">
          <span className={styles.timestamp}>{timeToDisplay}</span>
        </Tooltip>
      </div>
    </div>
  );
}

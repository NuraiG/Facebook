import Avatar from "@material-ui/core/Avatar";
import styles from "./Comment.module.scss";
import { Link } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { useState, useCallback } from "react";
import { getShortDate } from "../../utils";
import { Tooltip } from "@material-ui/core";

export default function Comment({ commentObj }) {
  // get the time for the post, formatted based on how long ago it was made
  let timeToDisplay = getShortDate(
    new Date().getTime(),
    commentObj.timestamp
  );
  // need this for the date tooltip
  let fullDatePrettified = new Date(commentObj.timestamp).toUTCString();

  const [isLiked, setIsLiked] = useState(0);
  // to like or unlike the comment
  const toggle = useCallback(() => setIsLiked(!isLiked), [isLiked, setIsLiked]);

  const truncateString = (description, maxLength) => {
    if (!description) return null;
    if (description.length <= maxLength) return description;
    return `${description.substring(0, maxLength)}...`;
  };
  const addLikes = () => {
    toggle();
    // modify the likes array;
  };
  return (
    <div className={styles.commentWrapper}>
      <div className={styles.imageWrapper}>
        <Link to="/">
          <Avatar alt={commentObj.authorName} src={commentObj.authorPhoto} />
        </Link>
      </div>
      <div className={styles.comment}>
        <div className={styles.commentBody}>
          <p> {commentObj.authorName}</p>
          <div> {truncateString(commentObj.content, 100)}</div>
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
          <button onClick={() => addLikes()}>Unlike</button>
        ) : (
          <button onClick={() => addLikes()}>Like</button>
        )}{" "}
        <Tooltip title={fullDatePrettified} placement="bottom">
          <span className={styles.timestamp}>{timeToDisplay}</span>
        </Tooltip>
      </div>
    </div>
  );
}

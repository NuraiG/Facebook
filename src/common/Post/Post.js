import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Post.module.scss";
import { calculateAndFormatTime } from "../../utils";

import { Avatar, Box, Button, Card, Grid, Tooltip } from "@material-ui/core";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";

// let postObj = {
//   author: "id",
//   authorName: "John Doe",
//   authorPhoto: "",
//   postTarget: "id", // where the post was made
//   postTargetDesc: "wall", // wall/page/group
//   date: "",
//   likes: ["id", "id2"],
//   comments: [],
//   content: "",
// };

export default function Post({ postObj }) {
  let currentUser = {
    id: "id",
    // ...
  };

  // get the time for the post, formatted based on how long ago it was made
  let timeToDisplay = calculateAndFormatTime(
    new Date().getTime(),
    postObj.timestamp
  );
  // need this for the date tooltip
  let fullDatePrettified = new Date(postObj.timestamp * 1000).toUTCString();

  let checkIfUserHasLiked = () => {
    return postObj.likes.some((id) => id === currentUser.id);
  };

  let [postIsLiked, setPostIsLiked] = useState(checkIfUserHasLiked());
  let [postTargetName, setPostTargetName] = useState(null);

  useEffect(() => {
    if (postObj.author !== postObj.postTarget) {
      // TODO: make request to take the target name from db
      setPostTargetName("Other username");
    }
  }, [postObj.author, postObj.postTarget]); // not sure about these dependencies

  let likePost = () => {
    setPostIsLiked(!postIsLiked);
    // TODO: send request to add the user to the liked list
  };

  return (
    <Card>
      <Grid container className={styles.post_header}>
        <Avatar src={postObj.authorPhoto} />
        <Grid item className={styles.post_info}>
          <h3>
            <Link to={`/profile/${postObj.author}`}>{postObj.authorName}</Link>
            {postTargetName && (
              <>
                <PlayArrowRoundedIcon />
                <Link to={`/profile/${postObj.postTarget}`}>
                  {postTargetName}
                </Link>
              </>
            )}
          </h3>
          <Tooltip title={fullDatePrettified}>
            <p className={styles.timestamp}>{timeToDisplay}</p>
          </Tooltip>
        </Grid>
        <Grid item>
          <MoreHorizIcon />
        </Grid>
      </Grid>

      <Box className={styles.post_content}>{postObj.content}</Box>
      <div className={styles.post_footer}>
        <Grid container className={styles.post_stats}>
          {postObj.likes.length > 0 && (
            <Grid item>
              {/* some icon or img */}
              {postObj.likes.length}
            </Grid>
          )}
          {postObj.comments.length > 0 && (
            <Grid item>{`${postObj.comments.length} Comments`}</Grid>
          )}
        </Grid>
        <Grid container className={styles.post_react}>
          <Grid item>
            <Button
              startIcon={
                postIsLiked ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />
              }
              onClick={likePost}
            >
              Like
            </Button>
            <Button startIcon={<ChatBubbleOutlineRoundedIcon />}>
              Comment
            </Button>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}

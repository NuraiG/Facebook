import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Post.module.scss";
import { calculateAndFormatTime } from "../../utils";
import { grayTheme, grayButtonTheme } from "../../customThemes";

import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  ThemeProvider,
  Tooltip,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";

let currentUser = {
  id: "id",
  // ...
};

export default function Post({ postObj }) {
  let checkIfUserHasLiked = () => {
    return postObj.likes.some((id) => id === currentUser.id);
  };

  let [postIsLiked, setPostIsLiked] = useState(checkIfUserHasLiked());
  let [commentsAreExpanded, setCommentsAreExpanded] = useState(false);
  let [postTargetName, setPostTargetName] = useState(null);

  // get the time for the post, formatted based on how long ago it was made
  let timeToDisplay = calculateAndFormatTime(
    new Date().getTime(),
    postObj.timestamp
  );
  // need this for the date tooltip
  let fullDatePrettified = new Date(postObj.timestamp).toUTCString();

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

  let expandComments = () => {
    setCommentsAreExpanded(!commentsAreExpanded);
    commentsAreExpanded
      ? console.log("hiding comments")
      : console.log("expanding comments");
    // TODO: also expand comments
  };

  const useStyles = makeStyles(() => ({
    btnContainer: {
      borderTop: 1,
      borderColor: grayButtonTheme.palette.secondary.main,
      borderStyle: "solid",
      paddingTop: "5px",
    },
    commentsExpanded: {
      borderBottom: 1,
      borderBottomStyle: "solid",
      paddingBottom: "5px",
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={grayTheme}>
      <Card color="secondary" className={styles.card}>
        <Box className={styles.post_header}>
          <Avatar src={postObj.authorPhoto} />
          <Box className={styles.post_info}>
            <h3>
              <Link to={`/profile/${postObj.author}`}>
                {postObj.authorName}
              </Link>
              {postTargetName && (
                <>
                  <PlayArrowRoundedIcon fontSize="small" />
                  <Link to={`/profile/${postObj.postTarget}`}>
                    {postTargetName}
                  </Link>
                </>
              )}
            </h3>
            <Tooltip title={fullDatePrettified} placement="bottom">
              <span className={styles.timestamp}>{timeToDisplay}</span>
            </Tooltip>
          </Box>
          <IconButton className={styles.more_btn}>
            <MoreHorizIcon />
          </IconButton>
        </Box>

        <Box className={styles.post_content}>{postObj.content}</Box>
        <div className={styles.post_footer}>
          <Grid container className={styles.post_stats} justify="space-between">
            <Grid item>
              {postObj.likes.length > 0 && (
                <span className={styles.stats_link}>
                  <div className={styles.likes_icon}>
                    <ThumbUpAltIcon />
                  </div>
                  {postObj.likes.length}
                </span>
              )}
            </Grid>
            <Grid item>
              <span
                onClick={expandComments}
                className={styles.stats_link}
              >
                {postObj.comments.length > 0 &&
                  `${postObj.comments.length} Comments`}
              </span>
            </Grid>
          </Grid>
          <ThemeProvider theme={grayButtonTheme}>
            <Grid
              container
              className={`${styles.post_react} ${classes.btnContainer} ${
                commentsAreExpanded ? classes.commentsExpanded : null
              }`}
            >
              <Grid item xs={6}>
                <Button
                  fullWidth
                  startIcon={
                    postIsLiked ? (
                      <ThumbUpAltIcon />
                    ) : (
                      <ThumbUpAltOutlinedIcon />
                    )
                  }
                  onClick={likePost}
                  color="secondary"
                  className={postIsLiked ? styles.liked : ""}
                >
                  Like
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  startIcon={<ChatBubbleOutlineRoundedIcon />}
                  color="secondary"
                >
                  Comment
                </Button>
              </Grid>
            </Grid>
          </ThemeProvider>
        </div>
        <div>
          {/* comments container */}
        </div>
      </Card>
    </ThemeProvider>
  );
}

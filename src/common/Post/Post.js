import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import EmptyComment from "../Comment/EmptyComment";
import { calculateAndFormatTime, getServerTime } from "../../utils/timeUtils";

// styles
import styles from "./Post.module.scss";
import { grayTheme, grayButtonTheme } from "../../customThemes";

// Material-UI
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  ThemeProvider,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
// icons
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import { truncateString } from "../../utils/utils";
import { MAX_POST_LENGTH } from "../../constants";
import {
  getCommentsForPost,
  getUserById,
  likePostRequest,
} from "../../service";
import PostOptionsBtn from "./PostOptionsBtn";

import FbImageLibrary from "react-fb-image-grid";

export default function Post({ postObj }) {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  let checkIfUserHasLikedPost = () => {
    return postObj.likes.some((id) => id === currentUser.id);
  };

  let [postIsLiked, setPostIsLiked] = useState(checkIfUserHasLikedPost());
  let [commentsAreExpanded, setCommentsAreExpanded] = useState(false);
  let [comments, setComments] = useState([]);
  let [postTargetName, setPostTargetName] = useState(null);
  let [truncatedContent, setTruncatedContent] = useState(
    truncateString(postObj.content, MAX_POST_LENGTH)
  );
  let isStringTruncated = truncatedContent !== postObj.content ? true : false;

  let [wholeContentIsShown, setWholeContentIsShown] = useState(
    !isStringTruncated
  );

  // get the time for the post, formatted based on how long ago it was made
  let timeToDisplay = calculateAndFormatTime(
    getServerTime()?.toDate(),
    new Date(postObj.timestamp?.toDate())
  );
  // need this for the date tooltip
  let fullDatePrettified = new Date(postObj.timestamp?.toDate()).toUTCString();

  useEffect(() => {
    if (postObj.createdById !== postObj.postTargetId) {
      getUserById(postObj.postTargetId).then((user) =>
        setPostTargetName(user.firstName + " " + user.lastName)
      );
    }
  }, [postObj.createdById, postObj.postTargetId]); // not sure about these dependencies

  let likePost = () => {
    likePostRequest(postObj.id, currentUser.id, !postIsLiked);
    setPostIsLiked(!postIsLiked);
  };

  let expandComments = () => {
    setCommentsAreExpanded(!commentsAreExpanded);
    // TODO: show loader
    getCommentsForPost(postObj.id).onSnapshot((data) => {
      let dbComments = [];

      data.forEach((doc) => {
        dbComments.push({ id: doc.id, ...doc.data() });
      });
      // hide loader
      setComments([...dbComments]);
    });
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
          <Avatar src={postObj.createdByPic} />
          <Box className={styles.post_info}>
            <h4>
              <Link to={`/profile/${postObj.createdById}`}>
                {postObj.createdByFullName}
              </Link>
              {postObj.feeling.length
                ? `\u00A0is feeling ${postObj.feeling}`
                : null}
              {postTargetName && (
                <>
                  <PlayArrowRoundedIcon fontSize="small" />
                  <Link to={`/profile/${postObj.postTargetId}`}>
                    {postTargetName}
                  </Link>
                </>
              )}
            </h4>
            <Tooltip
              title={<h6 className={styles.tooltip}>{fullDatePrettified}</h6>}
              placement="bottom"
            >
              <span className={styles.timestamp}>{timeToDisplay}</span>
            </Tooltip>
          </Box>
          {currentUser.id === postObj.createdById ? (
            <PostOptionsBtn postObj={postObj} />
          ) : null}
        </Box>
        <Box className={styles.post_content}>
          {truncatedContent}
          {!wholeContentIsShown && isStringTruncated && (
            <span
              className={styles.expand_content}
              onClick={() => {
                setTruncatedContent(postObj.content);
                setWholeContentIsShown(true);
              }}
            >
              See More
            </span>
          )}
          {postObj.attachedImages ? (
            <FbImageLibrary
              images={postObj.attachedImages}
              countFrom={2}
              className={postObj.attachedImages.length ? "" : styles.img_container}
            />
          ) : (
            ""
          )}
        </Box>

        <div className={styles.post_footer}>
          <Grid container className={styles.post_stats} justify="space-between">
            <Grid item>
              {postObj.likes.length > 0 && (
                <span className={styles.stats_link}>
                  <div className={styles.likes_icon}>
                    <ThumbUpAltIcon />
                  </div>
                  <h5>{postObj.likes.length}</h5>
                </span>
              )}
            </Grid>
            <Grid item>
              <span onClick={expandComments} className={styles.stats_link}>
                {postObj.numberOfComments > 0 && (
                  <h5> {postObj.numberOfComments} Comments </h5>
                )}
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
                <a href={`#${postObj.postId}`} className={styles.comment_link}>
                  <Button
                    fullWidth
                    startIcon={<ChatBubbleOutlineRoundedIcon />}
                    color="secondary"
                  >
                    Comment
                  </Button>
                </a>
              </Grid>
            </Grid>
          </ThemeProvider>
        </div>
        <div
          className={`${styles.comments_container} ${
            !commentsAreExpanded ? styles.hidden : null
          }`}
        >
          {comments.map((comment) => {
            return <Comment key={comment.id} commentObj={comment} />;
          })}
        </div>
        <div className={styles.add_comment_container}>
          <EmptyComment
            postId={postObj.id}
            postAuthorId={postObj.createdById}
            currentUser={currentUser}
          />
        </div>
      </Card>
    </ThemeProvider>
  );
}

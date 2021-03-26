import {
  Avatar,
  Button,
  Card,
  Grid,
  makeStyles,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import React from "react";
import styles from "./CreatePost.module.scss";

import { grayButtonTheme } from "../../customThemes";

import { currentUser } from "../../staticData";

// let possiblePlaceholders = [
//   `What's on your mind, ${currentUser.firstName}`,
//   `Write something to ${user.firstName}`,
// ];

export default function CreatePost({ placeholder }) {
  const useStyles = makeStyles(() => ({
    btnContainer: {
      borderTop: 1,
      borderColor: grayButtonTheme.palette.secondary.main,
      borderStyle: "solid",
      paddingTop: "5px",
    },
    commentsExpanded: {
      borderBottom: 1,
    },
  }));

  const classes = useStyles();

  return (
    <Card>
      <div class={styles.post_header}></div>
      <Avatar src={currentUser.profilePic} />
      <form>
        <input
          type="text"
          label="Your comment here"
          placeholder="Write a comment..."
        />
        <button
          type="submit"
        ></button>
      </form>
      <ThemeProvider theme={grayButtonTheme}>
        <Grid
          container
          className={`${styles.post_react} ${classes.btnContainer}`}
        >
          <Grid item xs={4}>
            <Button fullWidth color="secondary">
              Photo/Video
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth color="secondary">
              Tag
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth color="secondary">
              Feeling/Activity
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Card>
  );
}

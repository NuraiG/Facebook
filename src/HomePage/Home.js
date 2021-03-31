import React from "react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import SideNavigation from "../SideNavigation"
import CreatePost from "../common/CreatePost/CreatePost";
import Post from "../common/Post/Post";

import { posts } from "../staticData";
import styles from "./Home.module.scss";
import { Grid } from "@material-ui/core";

export default function Home() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  return (
    <div>
      <Header activeTab="home"/>
      <Grid container>
        <Grid item xs={3}>
          <SideNavigation />
        </Grid>
        <Grid item xs={6} className={styles.center_container}>
          <CreatePost target={currentUser} />
          <Post postObj={posts[0]} />
          <Post postObj={posts[1]} />
        </Grid>
        <Grid item xs={3}>
          {/* placeholder */}
        </Grid>
      </Grid>
    </div>
  );
}

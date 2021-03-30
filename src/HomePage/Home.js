import { Grid } from "@material-ui/core";
import React from "react";
import Header from "../Header/Header";
import SideNavigation from "../SideNavigation"
import CreatePost from "../common/CreatePost/CreatePost";
import Post from "../common/Post/Post";

import { posts } from "../staticData";
import styles from "./Home.module.scss";

export default function Home({user}) {
  return (
    <div>
      <Header activeTab="home"/>
      <Grid container>
        <Grid item xs={3}>
          <SideNavigation />
        </Grid>
        <Grid item xs={6} className={styles.center_container}>
          <CreatePost currentUser={user} target={user}/>
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

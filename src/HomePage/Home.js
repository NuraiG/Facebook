import { Grid } from "@material-ui/core";
import React from "react";
import Header from "../Header/Header";
import SideNavigation from "../SideNavigation"
import CreatePost from "../common/CreatePost/CreatePost";
import Post from "../common/Post/Post";

import { posts, currentUser } from "../staticData";

export default function Home() {
  return (
    <div>
      <Header />
      <Grid container spacing={8}>
        <Grid item xs={3}>
          <SideNavigation />
        </Grid>
        <Grid item xs={6}>
          <CreatePost placeholder={`What's on your mind, ${currentUser.firstName}?`}/>
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

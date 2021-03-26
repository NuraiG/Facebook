import { Grid } from "@material-ui/core";
import React from "react";
import Post from "../common/Post/Post";
import Header from "../Header/Header";

import {posts} from "../staticData";

export default function Home() {
  return (
    <div>
      <Header />
      <Grid container>
        <Grid item xs={3}>
          {/* placeholder */}
        </Grid>
        <Grid item xs={6}>
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

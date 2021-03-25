import { Grid } from "@material-ui/core";
import React from "react";
import Post from "../common/Post/Post";
import Header from "../Header/Header";

export default function Home() {
  // for testing only
  let postObj = {
    author: "id",
    authorName: "John Doe",
    authorPhoto: "",
    postTarget: "id", // where the post was made
    postTargetDesc: "wall", // wall/page/group
    date: "",
    likes: ["id", "id2"],
    comments: [],
    content: "",
    timestamp: 1616672141132
  };

  return (
    <div>
      <Header />
      <Grid container>
        <Grid item xs={3}>
          {/* placeholder */}
        </Grid>
        <Grid item xs={9}>
          <Post postObj={postObj}/>
        </Grid>
      </Grid>
    </div>
  );
}

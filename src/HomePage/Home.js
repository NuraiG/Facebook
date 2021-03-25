import { Grid } from "@material-ui/core";
import React from "react";
import Post from "../common/Post/Post";
import Header from "../Header/Header";

export default function Home() {
  // for testing only
  let posts = [
    {
      postId: 1,
      author: "id",
      authorName: "John Doe",
      authorPhoto: "",
      postTarget: "id2", // where the post was made
      postTargetDesc: "wall", // wall/page/group
      likes: ["id", "id2"],
      comments: [
        {
          commentId: 1,
          author: "id",
          authorName: "John Doe",
          authorPhoto: "",
          likes: [],
          content: "Wow, a comment",
          timestamp: 1616672141135,
          images: [],
        },
      ],
      content: "Wow",
      images: [],
      timestamp: 1616672141132,
    },
    {
      postId: 2,
      author: "id",
      authorName: "John Doe",
      authorPhoto: "",
      postTarget: "id", // where the post was made
      postTargetDesc: "wall", // wall/page/group
      likes: ["id", "id2"],
      comments: [],
      content: "Wow",
      images: [],
      timestamp: 1616672141132,
    },
  ];

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

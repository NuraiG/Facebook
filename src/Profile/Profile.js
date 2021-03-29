import React from "react";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import { Grid } from "@material-ui/core";
import Intro from "./Intro";
import CreatePost from "../common/CreatePost/CreatePost";

export default function Profile() {
  const { id } = useParams();

  return (
    <div>
      <Header />
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <ProfileHeader />
          <Grid container>
            <Grid item xs={5}>
              <Intro />
            </Grid>
            <Grid item xs={7}>
                <CreatePost placeholder={`Write something to ${"John Doe"}...`}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}

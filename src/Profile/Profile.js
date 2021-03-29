import React from "react";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import Intro from "./Intro";
import CreatePost from "../common/CreatePost/CreatePost";
import { currentUser } from "../staticData";

import { Grid } from "@material-ui/core";

export default function Profile() {
  const { id } = useParams();

  return (
    <div>
      <Header activeTab="none" />
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <ProfileHeader />
          <Grid container>
            <Grid item xs={5}>
              <Intro userProfileData={currentUser}/>
            </Grid>
            <Grid item xs={7}>
              <CreatePost placeholder={`Write something to ${"John Doe"}...`} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}

import React from "react";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import Intro from "./Intro";
import CreatePost from "../common/CreatePost/CreatePost";

import { Grid } from "@material-ui/core";
import PostsFeed from "./ProfilePostsFeed";

import ProfileNavigation from "./ProfileNavigation";

export default function Profile({currentUser}) {
  const { id } = useParams();
  // TODO: get profile by id and send it as target to the CreatePost component

  return (
    <div>
      <Header activeTab="none" />
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <ProfileHeader />
          <ProfileNavigation/>
          {/* <Grid container>
            <Grid item xs={5}>
              <Intro userProfileData={currentUser}/>
            </Grid>
            <Grid item xs={7}>
              <CreatePost currentUser={currentUser} target={({id: id, firstName: "John"})}/>
              <PostsFeed userId={"1"}/>
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item xs={1}></Grid>
      </Grid>
    </Grid>
    </div>
  );
}

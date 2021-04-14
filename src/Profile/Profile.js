import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
// import Intro from "./Intro/Intro";
// import CreatePost from "../common/CreatePost/CreatePost";

import { Grid } from "@material-ui/core";
// import PostsFeed from "./ProfilePostsFeed";
import ProfileNavigation from "./ProfileNavigation/ProfileNavigation";
import { getUserById } from "../firebase/service";
import { useSelector } from "react-redux";

// userId and hideHeader are used for when the profile is shown from fried requests page
export default function Profile({ userId, hideHeader }) {
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  let { id } = useParams();
  
  const [user, setUser] = useState({});

  useEffect(() => {
    if (currentUser.id === id) {
      setUser(currentUser);
    } else {
      let currentId = userId ? userId : id;
      getUserById(currentId).then((user) => {
        setUser({ ...user, id: currentId });
      });
    }
  }, [currentUser, id, userId]);

  return (
    <div>
      {hideHeader === true ? null : <Header activeTab="none" />}
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <ProfileHeader user={user} />
          <ProfileNavigation user={user} />
          {/* <Grid container>
            <Grid item xs={5}>
              <Intro userProfileData={user} />
              // <Intro userProfileData={currentUser} />
            </Grid>
            <Grid item xs={7}>
              <CreatePost
                currentUser={currentUser}
                target={{ id: userId ? userId : id, firstName: "John" }}
              />
              // <PostsFeed userId={userId ? userId : id} />
              <PostsFeed userId={"1"} />
            </Grid>
          </Grid>
        </Grid> */}
          <Grid item xs={1}></Grid>
        </Grid>
      </Grid>
    </div>
  );
}

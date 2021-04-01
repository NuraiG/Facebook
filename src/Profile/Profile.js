import React, {useState, useEffect} from "react";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import Intro from "./Intro";
import CreatePost from "../common/CreatePost/CreatePost";

import { Grid } from "@material-ui/core";
import PostsFeed from "./ProfilePostsFeed";
import ProfileNavigation from "./ProfileNavigation";
import { getUserById } from "../service";
import { useSelector } from "react-redux";
// import { SettingsInputAntennaTwoTone } from "@material-ui/icons";
// let userId= 'U99cAvfTmfhuHurhus6D5X2ejfo1';
export default function Profile() {

  const currentUser = useSelector((state) => state.currentUser.currentUser);
  // const { id } = useParams();
  let id="WCeUSdGKSoYL5C0bTOI7LO2CNAf1";
  // let id="U99cAvfTmfhuHurhus6D5X2ejfo1";
  const [user,setUser]= useState({});

    useEffect(() => {
      if(currentUser.id === id){
        setUser(currentUser)
      }
      else{
      getUserById(id).then((user) => {
        setUser({
          firstName: user.firstName,
          lastName:user.lastName,
          gender:user.gender, 
          profile_image: user.profile_image,
          cover_image:user.cover_image,
          bio:user.bio,
          id:id,
          images: user.images,
          residence: user.residence,
          birthPlace: user.birthPlace,
          registrationDate: user.registrationDate,
        });
      });
    }
    }, [currentUser,id]);
    console.log('User',user);
    console.log('User',user.firstName);
    console.log('User',user.lastName);

  // TODO: get profile by id and send it as target to the CreatePost component
     
  return (
    <div>
      <Header activeTab="none" />
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <ProfileHeader user={user} />
          <ProfileNavigation />
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

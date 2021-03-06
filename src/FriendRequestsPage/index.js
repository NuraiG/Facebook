import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Profile from "../Profile/Profile";
import {
  acceptFriendRequest,
  getMyFriendRequests,
  rejectFriendRequest,
} from "../firebase/service";
import FriendRequestComponent from "./FriendRequestComponent";
import styles from "./FriendRequestPage.module.scss";

import { Grid } from "@material-ui/core";

import no_friends from "./no_friends.svg";


export default function FriendRequestPage() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const [friendRequests, setFriendRequests] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (currentUser.id) {
      // get current user friend requests
      getMyFriendRequests(currentUser.id).onSnapshot((fr) => {
        let dbFriendRequests = [];
        fr.forEach((doc) => {
          dbFriendRequests.push({
            id: doc.id,         // friend request id
            ...doc.data(),      // friend request other data
          }); 
        });
        setFriendRequests([...dbFriendRequests]);
      });
    }
  }, [currentUser.id]);

  const onAccept = (id, senderId, receiverId) => {
    acceptFriendRequest(id, senderId, receiverId)
      .then(() => {
        if (selectedProfile === senderId) setSelectedProfile("");
        console.log("You are frineds now.");
      })
      .catch((error) =>
        console.log("We're sorry, a problem occurred: ", error)
      );
  };

  const onReject = (id, senderId) => {
    rejectFriendRequest(id)
      .then(() => {
        if (selectedProfile === senderId) setSelectedProfile("");
        console.log("The friend request has been rejected.");
      })
      .catch((error) =>
        console.log("We're sorry, a problem occurred: ", error)
      );
  };

  return (
    <Grid container>
      <Grid item xs="auto">
        {friendRequests.map((fr) => (
          <FriendRequestComponent
            key={fr.id}
            friendRequestObj={fr}
            onClick={() => setSelectedProfile(fr.from)}
            onAccept={onAccept}
            onReject={onReject}
          />
        ))}
      </Grid>
      <Grid item xs="auto" className={styles.profile_preview}>
        {selectedProfile !== "" ? <Profile userId={selectedProfile} hideHeader={true}/> : null}
      </Grid>
      <Grid item xs="auto" >
      {friendRequests.length === 0 ? 
        <div className={styles.container} >
          <img src={no_friends} alt="No Friends" className={styles.nofriends}></img>
          <h1>{t("friendRequestsPage.friendRequestsEmpty")}</h1>
         </div>
         :" "}
      </Grid>
    </Grid>
  );
}



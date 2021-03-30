import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Profile from "../Profile/Profile";
// import { getMyFriendRequests } from "../service";
import FriendRequestComponent from "./FriendRequestComponent";

let user = {
  id: "U99cAvfTmfhuHurhus6D5X2ejfo1",
  profile_image: "",
  firstName: "Елица",
  lastName: "Иванова",
  registrationDate: "March 29, 2021 at 1:47:01 PM UTC+3",
  birthDate: "March 29, 2000 at 1:47:01 PM UTC+3",
  birthPlace: "Sofia",
  residence: "Sofia",
  gender: "Female",
};

let currentUser = {
  id: "U99cAvfTmfhuHurhus6D5X2ejfo1",
  profile_image: "",
  firstName: "Елица",
  lastName: "Иванова",
  registrationDate: "March 29, 2021 at 1:47:01 PM UTC+3",
  birthDate: "March 29, 2000 at 1:47:01 PM UTC+3",
  birthPlace: "Sofia",
  residence: "Sofia",
  gender: "Female",
};

export default function FriendRequestPage() {
  const [friendRequests, setFriendRequests] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  useEffect(() => {
    // get current user friend requests
    // getMyFriendRequests(currentUserId)
    // .onSnapshot(data) => {
    //   let dbFriendRequests = [];
    //   data.forEach((doc) => {
    //      getUserById()....
    //
    //          dbFriendRequests.push({ id: doc.id, ...doc.data(),
    //              fullName: user.firstName + ' ' + user.lastName,
    //              profile_image: user.profile_image});
    //   });
    //   setFriendRequests([...dbFriendRequests]);
  }, []);

  return (
    <Grid container>
      <Grid item xs="auto">
        <FriendRequestComponent user={user} onClick={() => setSelectedProfile()} />

        {/* {friendRequests.map((fr) => (
          <FriendRequestComponent key={fr.id} friendRequestObj={fr} onClick={() => setSelectedProfile(fr.id)}/>
        ))} */}
      </Grid>
      <Grid item xs="auto">
        {selectedProfile ? (
          <Profile userId={selectedProfile} currentUser={currentUser} />
        ) : null}
      </Grid>
    </Grid>
  );
}

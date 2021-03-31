import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Profile from "../Profile/Profile";
import { acceptFriendRequest, getMyFriendRequests, rejectFriendRequest } from "../service";
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

  const onAccept = (id, senderId, receiverId) => {
    acceptFriendRequest(id, senderId, receiverId)
      .then(() => {
        if (selectedProfile === receiverId) setSelectedProfile("");
        console.log("You are frineds now.");
      })
      .catch((error) =>
        console.log("We're sorry, a problem occurred: ", error)
      );
  };

  const onReject = (id, receiverId) => {
    rejectFriendRequest(id)
      .then(() => {
        if (selectedProfile === receiverId) setSelectedProfile("");
        console.log("The friend request has been rejected.");
      })
      .catch((error) =>
        console.log("We're sorry, a problem occurred: ", error)
      );
  };

  return (
    <Grid container>
      <Grid item xs="auto">
        <FriendRequestComponent
          user={user}
          onClick={() => setSelectedProfile()}
          onAccept={onAccept}
          onReject={onReject}
        />

        {/* {friendRequests.map((fr) => (
          <FriendRequestComponent
            key={fr.id}
            friendRequestObj={fr}
            onClick={() => setSelectedProfile(fr.id)}
            onAccept={onAccept}
            onReject={onReject}
          />
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

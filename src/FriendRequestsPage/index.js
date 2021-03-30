import React from "react";
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

export default function FriendRequestPage() {
  return (
    <div>
      <FriendRequestComponent user={user} />
    </div>
  );
}

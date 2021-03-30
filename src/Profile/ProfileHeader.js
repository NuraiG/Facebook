import React, { useState, useEffect, useCallback } from "react";
import firebase, { database, storage } from "../firebase";

//material ui
import {
  Button,
  Avatar,
  Badge,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  Input,
} from "@material-ui/core";

//material icons
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import styles from "./ProfileHeader.module.scss";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import { useDropzone } from "react-dropzone";

//testing: current user;
const currentUser = {
  firstName: "John",
  lastName: "Doe",
  profile_image: "",
  cover_image: "",
  id: 3,
  // id:32,
};
export default function ProfileHeader({
  firstName,
  profile_image,
  cover_image,
  id,
  lastName,
  description,
}) {
  const [isTextAreaOpen, setTextArea] = useState(false);
  const [profileImage, setProfileImage]= useState('');
  const [coverImage,setCoverImage]=useState('');
  const [bio,setBio] = useState('');

  let currId="i8gEgFRafjdBrr9iizH62tb45L62";
  //for testing;
  firstName = "John ";
  lastName = "Doe";
  // profile_image =
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLVQKJyzWpzBfJQ4kH7H506LSloi9a7ThuuA&usqp=CAU";
  // cover_image =
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWMgXEhCQnvUB92US-XnJUWMnLtoy-zqqW2g&usqp=CAU";
  id = 3;
  // description = "Nature lover";
  const onDropCover = useCallback((acceptedFile) => { 
    setCoverImage(acceptedFile[0]);
  }, []);

  const { getRootProps: getRootPropsCover, getInputProps: getInputPropsCover } = useDropzone({
    onDrop: onDropCover,
    accept: "image/*",
  });

  //todo: add/change cover image
  const changeCoverImage=()=>
  {
  const uploadTask = storage
    .ref()
    .child("images/" + Date.now())
    .put(coverImage);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

        database
          .collection("users")
          .doc(currId)
          .set({
            cover_image: downloadURL,
            images: firebase.firestore.FieldValue.arrayUnion(downloadURL)
          })
          .then(() => {
            console.log("Document successfully written!");
            console.log("Cover image",cover_image);
          })
          .catch((error) => {
            console.error( error);
          });

      });
    }
  );
};
  console.log( 'Cover:',coverImage)
  console.log('Profile',profileImage);
  const onDrop = useCallback((acceptedFile) => { 
    setProfileImage(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const changeProfileImage = () => {

  const uploadTask = storage
    .ref()
    .child("images/" + Date.now())
    .put(profileImage);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

        database
          .collection("users")
          .doc(currId)
          .update({
            profile_image: downloadURL,
            images: firebase.firestore.FieldValue.arrayUnion(downloadURL)
          })
          .then(() => {
            console.log("Document successfully written!");
            console.log("Profile image",profile_image);
          })
          .catch((error) => {
            console.error( error);
          });

      });
    }
  );
};

  //todo: edit bio/add bio
   const changeBio=()=>{}

  // created custom avatar
  const StyledAvatar = withStyles({
    root: {
      width: 200,
      height: 200,
      borderStyle: "solid",
      borderWidth: 7,
      borderColor: "white",
    },
  })(Avatar);

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(3),
      fontWeight: 900,
    },
  }));
  const classes = useStyles();

  return (
    <>
      <div className={styles.profileWrapper}>
        <div className={styles.cover}>
          {cover_image && <img src={cover_image} alt="cover"></img>}
        </div>

        {currentUser.id === id && (
          <div className={styles.btn}>
            <input {...getInputPropsCover()}></input>
            <Button
            {...getRootPropsCover({ className: "dropzone" })}
              variant="contained"
              color="default"
              className={classes.button}
              size="large"
              startIcon={<PhotoCameraIcon onClick={changeCoverImage} />}
            >
              {" "}
              Add Cover Photo
            </Button>
          </div>
        )}

        <div className={styles.profilImage}>
          {currentUser.id === id ? (
            <React.Fragment>
            <input {...getInputProps()}></input>
            <Badge
            {...getRootProps({ className: "dropzone" })}
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <PhotoCameraIcon
                  onClick={changeProfileImage}
                  className={styles.icon}
                />
              }
            >
              <StyledAvatar src={profile_image}></StyledAvatar>
            </Badge>
            </React.Fragment>
          ) : (
            <StyledAvatar
              src={profile_image}
              className={styles.profilFriendImage}
            ></StyledAvatar>
          )}
        </div>
        <h1>
          {firstName} {lastName}
        </h1>
        {/* view current user profile and add/edit bio */}
        {currentUser.id === id ? (
          <div className={styles.bio}>
          <p>{description}</p>
            {!isTextAreaOpen ? (
              <span
                onClick={() => {
                  setTextArea(true);
                }}
              >
                {description ? 'Edit Bio' : 'Add Bio' }
              </span>
            ) : null}
            {isTextAreaOpen ? (
              <div className={styles.addBio}>
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Input placeholder="Describe how your are" multiline></Input>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button onClick={() => setTextArea(false)}>Cancel</Button>
                    <Button onClick={() => changeBio()}>
                      Save
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ) : null}
          </div>
        ) : (
          <p>{description}</p>
        )}
      </div>
    </>
  );
}

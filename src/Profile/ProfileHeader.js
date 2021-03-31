import React, { useState,  useCallback } from "react";
import  { storage } from "../firebase";
import {updateUserBio, editProfileImage, editCoverImage} from "../service";

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

  

  let currId="Fy83HbX6cxX2VPPA7QG7bu3QTwr1";
  //for testing;
  firstName = "John ";
  lastName = "Doe";
  id = 3;
  // description = "Nature lover";


  // add or edit cover image
  const onDropCover = useCallback((acceptedFile) => { 
    setCoverImage(acceptedFile[0]);
    const uploadTask = storage
    .ref()
    .child("images/" + Date.now())
    .put(coverImage);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log("Upload is done");
    },
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        editCoverImage(currId,downloadURL);
      });
    }
  );

  }, [coverImage,currId]);

  const { getRootProps: getRootPropsCover, getInputProps: getInputPropsCover } = useDropzone({
    onDrop: onDropCover,
    accept: "image/*",
  });


// add or edit profile image;
  const onDrop = useCallback((acceptedFile) => { 
    setProfileImage(acceptedFile[0]);
    const uploadTask = storage
    .ref()
    .child("images/" + Date.now())
    .put(profileImage);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log("Upload is done");
    },
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        editProfileImage(currId,downloadURL);
      });
    }
  );
  }, [profileImage,currId]);

  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  }); 

  

  //edit bio/add bio
   const changeBio=()=>{
    updateUserBio(currId,bio);
   }

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
              startIcon={<PhotoCameraIcon />}
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
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <PhotoCameraIcon
                {...getRootProps({ className: "dropzone" })}
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
                      <Input placeholder="Describe how your are" multiline value={bio} onInput={(ev)=>{setBio(ev.target.value)}}></Input>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button onClick={() => setTextArea(false)}>Cancel</Button>
                    <Button onClick={() =>{
                     changeBio()
                     setTextArea(false)
                    }
                    }>
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

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

import { useDispatch, useSelector } from "react-redux";


export default function ProfileHeader({user}) {

  const [isTextAreaOpen, setTextArea] = useState(false);
  const [profileImage, setProfileImage]= useState('');
  const [coverImage,setCoverImage]=useState('');
  const [bio,setBio] = useState('');

  const currentUser = useSelector((state) => state.currentUser.currentUser);


  // add or edit cover image
  const onDropCover = useCallback((acceptedFile) => { 
    setCoverImage(acceptedFile);
    const uploadTask = storage
    .ref()
    .child("images/"+ currentUser.id + "_"+ Date.now())
    .put(acceptedFile[0]);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log("Upload is done");
    },
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        editCoverImage(currentUser.id,downloadURL);
      });
    }
  );

  }, [currentUser.id]);

  const { getRootProps: getRootPropsCover, getInputProps: getInputPropsCover } = useDropzone({
    onDrop: onDropCover,
    accept: "image/*",
  });


// add or edit profile image;
  const onDrop = useCallback((acceptedFile) => { 
    // setProfileImage(acceptedFile);
    const uploadTask = storage
    .ref()
    .child("images/" + currentUser.id + "_"+ Date.now())
    // .put(profileImage);
    .put(acceptedFile[0]);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      let progress= (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      console.log(error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        editProfileImage(currentUser.id,downloadURL);
      });
    }
  );
  }, [currentUser.id]);

  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  }); 

  

  //edit bio/add bio
   const changeBio=()=>{
    updateUserBio(currentUser.id,bio);
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
          {user.cover_image && <img src={user.cover_image} alt="cover"></img>}
        </div>

        {currentUser.id === user.id && (
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
          {currentUser.id === user.id ? (
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
              <StyledAvatar src={currentUser.profile_image}></StyledAvatar>
            </Badge>
            </React.Fragment>
          ) : (
            <StyledAvatar
              src={user.profile_image}
              className={styles.profilFriendImage}
            ></StyledAvatar>
          )}
        </div>
        <h1>
          {user.firstName}   {user.lastName}
        </h1>
        {/* view current user profile and add/edit bio */}
        {currentUser.id === user.id ? (
          <div className={styles.bio}>
          <p>{currentUser.bio}</p>
            {!isTextAreaOpen ? (
              <span
                onClick={() => {
                  setTextArea(true);
                }}
              >
                {currentUser.bio ? 'Edit Bio' : 'Add Bio' }
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
          <p>{user.bio}</p>
        )}
      </div>
    </>
  );
}

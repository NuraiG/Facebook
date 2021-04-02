import React,{useState} from "react";
import styles from "./Intro.module.scss";

import { Box, Card, ThemeProvider, Button } from "@material-ui/core";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import RoomIcon from "@material-ui/icons/Room";
import CakeIcon from "@material-ui/icons/Cake";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { grayTheme } from "../customThemes";


import { makeStyles } from "@material-ui/core/styles";

import {useSelector, useDispatch } from "react-redux";
import {updateUserProfile } from "./CurrentUser.actions";

import {updateUserBirthPlace,updateUserResidence} from "../service"

import IntroUpdateDialog from "./IntroUpdateDialog";



export default function Intro({ userProfileData }) {
  const currentUser = useSelector(state => state.currentUser.currentUser);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [birthPlaceInput, setBirthPlace] = useState("");
  const [residenceInput, setResidence] = useState("");

  const dispatch = useDispatch();

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };


  const saveData =()=>{
    updateUserResidence(currentUser.id,residenceInput);
    updateUserBirthPlace(currentUser.id,birthPlaceInput);
    dispatch(updateUserProfile({...currentUser, birthPlace:birthPlaceInput,residence:residenceInput})); 
    setIsDialogOpen(false);
  }

  const useStyles = makeStyles((theme) => ({
    button: {
      fontWeight: 600,
    },
  }));
  const classes = useStyles();
  return (
    <aside>
      <ThemeProvider theme={grayTheme}>
        <Card color="secondary" className={styles.card}>
          <h2 className={styles.heading}>Intro</h2>
          {userProfileData.residence && (
            <Box className={styles.profile_info}>
              <HomeRoundedIcon />
              Lives in {userProfileData.residence}
            </Box>
          )}
          {userProfileData.birthPlace &&(
            <Box className={styles.profile_info}>
              <RoomIcon />
              From {userProfileData.birthPlace}
            </Box>
          )}
          <Box className={styles.profile_info}>
            <CakeIcon />
            Born on {userProfileData.birthDate?.toDate().toDateString()}
          </Box>
          <Box className={styles.profile_info}>
            <WatchLaterIcon />
            Joined on {userProfileData.registrationDate?.toDate().toDateString()}
          </Box>
          {currentUser.id === userProfileData.id ? 
          <Box className={styles.btn}>
          <Button variant="contained" color="default" fullWidth className={classes.button} onClick={handleDialogOpen}>Edit Details</Button>
          </Box> : ""
          }
        </Card>
      </ThemeProvider>
      <IntroUpdateDialog 
       isOpen={isDialogOpen}
       onClose={handleDialogClose}
       birthPlace={birthPlaceInput}
       onChangeBirthPlace={setBirthPlace}
       onChangeResidence={setResidence}
       residence={residenceInput}
       updateProfilData={saveData}
       />
    </aside>
  );
}

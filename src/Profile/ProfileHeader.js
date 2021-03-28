import React from 'react'
//material ui
import {Button, Avatar, Badge} from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import styles from './ProfileHeader.module.scss';
import {withStyles} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

//testing: current user;
const currentUser = {firstName:'John',
                    lastName:'Doe',
                    // friends:[],
                    profile_image: "",
                    cover_image:"",
                    // gender:'Male',
                    // address:'Sofia',
                    // birth_day:'',
                    // id: 3,
                    id:32,
                    // posts:[],
                }
export default function ProfileHeader({firstName, profile_image, cover_image, id,lastName,friends}) {

    //for testing;
    firstName = "John ";
    lastName = "Doe";
    profile_image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLVQKJyzWpzBfJQ4kH7H506LSloi9a7ThuuA&usqp=CAU";
    cover_image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWMgXEhCQnvUB92US-XnJUWMnLtoy-zqqW2g&usqp=CAU";
    id = 3;
    friends=[];

    // created custom avatar 
    const StyledAvatar = withStyles({
        root: {
            width: 200,
            height: 200,
            borderStyle: 'solid',
            borderWidth: 7,
            borderColor: 'white',
        },
    })(Avatar);

    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(3),
          fontWeight:900,
        },
      }));
      const classes = useStyles();

    return (
        <>
            <div className={
                styles.profileWrapper
            }> <div className={styles.cover}>
                {cover_image && <img src={cover_image}
                    alt='cover'></img> }
                    </div>
                {currentUser.id === id &&
                <div className={styles.btn}>
                    
                <Button variant="contained" color="default"className={classes.button} size="large"startIcon={<PhotoCameraIcon/>}
                onClick={()=>console.log("add cover image")}> Add Cover Photo</Button>
                </div>
}
                <div className={
                    styles.profilImage
                }>
                    {currentUser.id === id ? 
                    <Badge overlap="circle"
                        anchorOrigin={
                            {
                                vertical: 'bottom',
                                horizontal: 'right'
                            }
                        }
                        badgeContent={<PhotoCameraIcon onClick={()=>{console.log("change profile image")}}
                        className={styles.icon}/>}>
                        <StyledAvatar src={profile_image}></StyledAvatar>
                    </Badge>
: <StyledAvatar src={profile_image} className={styles.profilFriendImage}></StyledAvatar> }
                </div>
                <h1>{firstName} {lastName}</h1>
            </div>
        </>
    );
}

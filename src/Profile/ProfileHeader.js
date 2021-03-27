import React from 'react'
import {Button, Avatar, Badge} from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import styles from './ProfileHeader.module.scss';
import {withStyles} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

export default function ProfileHeader(userName, userImage, userCoverImage, userId) {

    //for testing;
    userName = "John Doe";
    userImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLVQKJyzWpzBfJQ4kH7H506LSloi9a7ThuuA&usqp=CAU";
    userCoverImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWMgXEhCQnvUB92US-XnJUWMnLtoy-zqqW2g&usqp=CAU";
    userId = 3;

    // created custom avatar 
    const StyledAvatar = withStyles({
        root: {
            width: 200,
            height: 200,
        }
    })(Avatar);

    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(3),
        },
      }));
      const classes = useStyles();

    return (
        <>
            <div className={
                styles.profileWrapper
            }>
                {/* <div className={styles.cover}> */}
                <img src={userCoverImage}
                    alt='cover'></img>
                {/* </div> */}
                {/* <div className={
                    styles.profilImageWrapper
                }> */}
                <div className={styles.btn}>
                <Button variant="contained" color="default" className={classes.button} size="large"startIcon={<PhotoCameraIcon/>}> Add Cover Photo</Button>
                </div>
                <div className={
                    styles.profilImage
                }>
                    <Badge overlap="circle"
                        anchorOrigin={
                            {
                                vertical: 'bottom',
                                horizontal: 'right'
                            }
                        }
                        badgeContent={<PhotoCameraIcon style={
                            {backgroundColor: "#eff2f5",
                            borderRadius: '999px' ,padding: '2px'}
                        }/>}>
                        <StyledAvatar src={userImage}></StyledAvatar>
                    </Badge>
                </div>
                <h1>{userName}</h1>
            </div>
        </>
    );
}

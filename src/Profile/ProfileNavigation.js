import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

import {
  Box,
  ThemeProvider,
  Tab,
  Tabs,
  Button,
  Typography,
  Toolbar,
  AppBar,
} from "@material-ui/core";

import { useSelector } from "react-redux";

import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { grayTheme, customButtonBlueGreen } from "../customThemes";

import Intro from "./Intro";
import CreatePost from "../common/CreatePost/CreatePost";

import { Grid , Paper} from "@material-ui/core";
import PostsFeed from "./ProfilePostsFeed";
import { sendFriendRequest } from "../service";
import { useEffect } from "react";

import styles from "./Profile.module.scss";

import { getUserById } from "../service";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} border={0} component="span">
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    marginTop: 30,
    border: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin:theme.spacing(2),
  },

}));

export default function ProfileNavigation({ user }) {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const [images, setImages]= useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSendFriendRequest = () => {
    sendFriendRequest(currentUser.id, user.id)
      .then(console.log("Successfully sent a friend request"))
      .catch((error) =>
        console.log(
          "An error occurred while sending the friend request ",
          error
        )
      );
  };

  useEffect(() => {
    getUserById(user ? user.id : currentUser.id)
    .then((res)=> res.images)
      .then((images) => {
        let dbImages = [];

        images.forEach((img) => {
          dbImages.push(img);
        });

        setImages(dbImages);
      });
  }, [currentUser.id, user]);
 

  return (
    <ThemeProvider theme={grayTheme}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Posts"  style={{ fontSize: '14px' }}  {...a11yProps(0)} />
                <Tab label="Photos"  style={{ fontSize: '14px' }}  {...a11yProps(1)} />
                <Tab label="Friends"  style={{ fontSize: '14px' }}  {...a11yProps(2)} />
              </Tabs>
            </Typography>
            <ThemeProvider theme={customButtonBlueGreen}>
              {/* are friends */} {/* and a friend request has not been sent */}
              {user.id !== currentUser.id  ? (
                <Button
                  color="primary"
                  className={classes.menuButton}
                  startIcon={<PersonAddIcon />}
                  onClick={onSendFriendRequest}
                  style={{ fontSize: '14px' }} 
                >
                  Add friend
                </Button>
              ) : (
                ""
              )}
            </ThemeProvider>
          </Toolbar>
        </AppBar>
        <TabPanel value={value} index={0}>
          {/* Posts */}
          <React.Fragment>
            <Grid container>
              <Grid item xs={5}>
                <Intro userProfileData={user} />
              </Grid>
              <Grid item xs={7}>
                <CreatePost
                  target={user}
                />
                <PostsFeed userId={user.id} />
              </Grid>
            </Grid>
          </React.Fragment>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* Photos */}
          <React.Fragment>
            <Grid container>
             {images.map((image)=>(
                <Grid item xs={6} sm={3} key={image}>
                  <Paper className={classes.paper}> <img src={image} alt="my photos" className={styles.imagesContainer}/></Paper>
                </Grid>
             ))}
            </Grid>
          </React.Fragment>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Friends
        </TabPanel>
      </div>
    </ThemeProvider>
  );
}

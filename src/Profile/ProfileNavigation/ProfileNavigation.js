import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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

import { grayTheme, customButtonBlueGreen, grayThemeDark } from "../../customThemes";

import Intro from "../Intro/Intro";
import CreatePost from "../../common/CreatePost/CreatePost";

import { Grid, Paper } from "@material-ui/core";
import PostsFeed from "../ProfilePostsFeed";
import {
  getActiveFriendRequestsBetweenUsers,
  sendFriendRequest,
  getUserById,
} from "../../firebase/service";
import { useEffect } from "react";

import styles from "../Profile.module.scss";

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
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: theme.spacing(2),
  },
}));

export default function ProfileNavigation({ user }) {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const [friendInviteSent, setFriendInviteSent] = useState(false);
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const [images, setImages] = useState([]);

  const { t } = useTranslation();

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
    if (user ? user.id : currentUser.id) {
      getUserById(user ? user.id : currentUser.id)
        .then((res) => res.images)
        .then((images) => {
          let dbImages = [];
          images.forEach((img) => {
            dbImages.push(img);
          });

          setImages(dbImages);
        });
    }
  }, [currentUser.id, user]);

  useEffect(() => {
    if (currentUser.id && user.id && currentUser.id !== user.id) {
      getActiveFriendRequestsBetweenUsers(currentUser.id, user.id).then(
        (res) => {
          res.forEach((request) => {
            setFriendInviteSent(true);
          });
        }
      );

      if (!friendInviteSent) {
        getActiveFriendRequestsBetweenUsers(user.id, currentUser.id).then(
          (res) => {
            res.forEach((request) => {
              setFriendInviteSent(true);
            });
          }
        );
      }
    }
  }, [currentUser.id, user.id, friendInviteSent]);

  return (
    <ThemeProvider theme={currentUser.darkModeTurnedOn ? grayThemeDark : grayTheme}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab
                  label={t("profilePage.posts")}
                  style={{ fontSize: "14px" }}
                  {...a11yProps(0)}
                />
                <Tab
                  label={t("profilePage.photos")}
                  style={{ fontSize: "14px" }}
                  {...a11yProps(1)}
                />
                {/* <Tab
                  label={t("profilePage.friends")}
                  style={{ fontSize: "14px" }}
                  {...a11yProps(2)}
                /> */}
              </Tabs>
            </Typography>
            <ThemeProvider theme={customButtonBlueGreen}>
              {user.id !== currentUser.id &&
              !currentUser.friends.includes(user.id) &&
              !friendInviteSent ? (
                <Button
                  color="primary"
                  className={classes.menuButton}
                  startIcon={<PersonAddIcon />}
                  onClick={onSendFriendRequest}
                  style={{ fontSize: "14px" }}
                >
                  {t("profilePage.addFriendBtn")}
                </Button>
              ) : (
                " "
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
                <CreatePost target={user} />
                <PostsFeed userId={user.id} />
              </Grid>
            </Grid>
          </React.Fragment>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* Photos */}
          <React.Fragment>
            <Grid container>
              {images.map((image) => (
                <Grid item xs={6} sm={3} key={image}>
                  <Paper className={classes.paper}>
                    {" "}
                    <img
                      src={image}
                      alt="my photos"
                      className={styles.imagesContainer}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </React.Fragment>
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
          Friends
        </TabPanel> */}
      </div>
    </ThemeProvider>
  );
}

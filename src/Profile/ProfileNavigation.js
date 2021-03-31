import React from "react";

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

import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { grayTheme, customButtonBlueGreen } from "../customThemes";
import styles from "./Profile.module.scss";

import Intro from "./Intro";
import CreatePost from "../common/CreatePost/CreatePost";

import { Grid } from "@material-ui/core";
import PostsFeed from "./ProfilePostsFeed";

const currentUser = {
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
const target = {
  id: "Fy83HbX6cxX2VPPA7QG7bu3QTwr1",
  profile_image: "",
  firstName: "Max",
  lastName: "Maxov",
  registrationDate: "March 30, 2021 at 1:47:01 PM UTC+3",
  birthDate: "March 23, 2003 at 1:47:01 PM UTC+3",
  birthPlace: "Sofia",
  residence: "Sofia",
  gender: "Male",
};

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
          <Typography>{children}</Typography>
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
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ProfileNavigation(currentUser, target) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //  const areFriends = (currentUser.id, target.id)=>{
  //      return currentUser.frindsList.includes(target.id);
  //  }

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
                <Tab label="Posts" {...a11yProps(0)} />
                <Tab label="Photos" {...a11yProps(1)} />
                <Tab label="Friends" {...a11yProps(2)} />
              </Tabs>
            </Typography>
            <ThemeProvider theme={customButtonBlueGreen}>
              {/* { !areFriends ?  */}
              <Button
                color="primary"
                className={classes.menuButton}
                startIcon={<PersonAddIcon />}
              >
                Add friend
              </Button>
              {/* : */}
              {/* //  <h2>I{target.firstName} {target.lastName}</h2>
            // } */}
            </ThemeProvider>
          </Toolbar>
        </AppBar>
        <TabPanel value={value} index={0}>
          {/* Posts */}
          <React.Fragment>
          <Grid container>
            <Grid item xs={5}>
              <Intro userProfileData={currentUser}/>
            </Grid>
            <Grid item xs={7}>
              <CreatePost currentUser={currentUser} target={({id: 4, firstName: "John"})}/>
              <PostsFeed userId={"1"}/>
            </Grid>
         </Grid>
         </React.Fragment>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Photos
        </TabPanel>
        <TabPanel value={value} index={2}>
          Friends
        </TabPanel>
      </div>
    </ThemeProvider>
  );
}

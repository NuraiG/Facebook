import React, {useState} from "react";

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

import { Grid } from "@material-ui/core";
import PostsFeed from "./ProfilePostsFeed";


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
    border: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ProfileNavigation({user}) {

  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



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
               {/* are friends */}
              { user.id !== currentUser.id ? 
              <Button
                color="primary"
                className={classes.menuButton}
                startIcon={<PersonAddIcon />}
              >
                Add friend
              </Button>
              : ''}
            </ThemeProvider>
          </Toolbar>
        </AppBar>
        <TabPanel value={value} index={0}>
          {/* Posts */}
          <React.Fragment>
          <Grid container>
            <Grid item xs={5}>
              <Intro userProfileData={user}/>
            </Grid>
            <Grid item xs={7}>
              <CreatePost currentUser={user} target={({id: 4, firstName: "John"})}/>
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

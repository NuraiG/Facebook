import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";

// styles
import styles from "./Header.module.scss";
import { grayButtonTheme, grayTheme } from "../customThemes";

// Material-UI
import {
  Avatar,
  Button,
  ClickAwayListener,
  makeStyles,
  Popper,
  ThemeProvider,
} from "@material-ui/core";
// Icons
import SearchIcon from "@material-ui/icons/Search";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import HeaderNavOption from "./HeaderNavOption";
import { getAllUsers } from "../service";

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: grayTheme.palette.secondary.main,
    boxSizing: "border-box",
    borderRadius: "8px",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.5) 0px 0px 0px 1px inset",
  },
}));

export default function HeaderLeft() {
  let [btnSelected, setBtnSelected] = useState(false);
  let [searchInput, setSearchInput] = useState("");
  let [allUsers, setAllUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  let onSelect = () => {
    setBtnSelected(!btnSelected);
    // TODO: open/close mobile menu
  };

  let onInput = (ev) => {
    setSearchInput(ev.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    // add user to recent searches
    setSearchInput("");
    setOpen(false);
  };

  let filterUsers = useMemo(() => {
    return searchInput.length === 0
      ? []
      : allUsers.filter((user) =>
          user.fullName.toLowerCase().includes(searchInput.toLowerCase())
        );
  }, [allUsers, searchInput]);

  useEffect(() => {
    getAllUsers().then((users) => {
      let dbUsers = [];
      users.forEach((doc) => {
        let userData = doc.data();
        dbUsers.push({
          id: doc.id,
          fullName: userData.firstName + " " + userData.lastName,
          profilePic: userData.profile_image,
        });
      });
      setAllUsers(dbUsers);
    });
  }, []);

  const classes = useStyles();
  return (
    <div className={styles.header__left}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <label className={styles.header__input}>
        <input
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
          placeholder="Search Facebook"
          onInput={onInput}
        />
        <SearchIcon />
      </label>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        disablePortal
        className={styles.dropdown_container}
      >
        <div className={filterUsers.length > 0 ? classes.paper : null}>
          <ClickAwayListener onClickAway={handleClose}>
            <div className={styles.dropdown}>
              {filterUsers.map((user) => {
                return (
                  <Button
                    fullWidth
                    className={styles.filtered_user}
                    key={user.id}
                    onClick={handleClose}
                    component={Link}
                    to={"/profile/" + user.id}
                    startIcon={<Avatar src={user.profilePic}/>}
                  >
                    <div className={styles.result_wrapper}>{user.fullName}</div>
                  </Button>
                );
              })}
            </div>
          </ClickAwayListener>
        </div>
      </Popper>

      <ThemeProvider theme={grayButtonTheme}>
        <HeaderNavOption
          className={`${styles.header_btn} ${styles.header_responsive_btn}`}
          key={"Menu"}
          tooltip={"Menu"}
          selected={btnSelected}
          outline={<MenuRoundedIcon color="secondary" fontSize="large" />}
          filled={<MenuRoundedIcon fontSize="large" />}
          onClick={onSelect}
        />
      </ThemeProvider>
    </div>
  );
}

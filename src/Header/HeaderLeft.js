import React, { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const allUsers = useSelector((state) => state.allUsers.allUsers);
  const { t } = useTranslation();

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
    return searchInput.trim().length === 0
      ? []
      : allUsers.filter((user) =>
          (user.firstName + " " + user.lastName)
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        );
  }, [allUsers, searchInput]);

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
          placeholder={t("header.search")}
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
              {filterUsers.map((user) => (
                <Button
                  fullWidth
                  className={styles.filtered_user}
                  style={{ fontSize: "14px" }}
                  key={user.id}
                  onClick={handleClose}
                  component={Link}
                  to={"/profile/" + user.id}
                  startIcon={<Avatar src={user.profile_image} />}
                >
                  <div className={styles.result_wrapper}>
                    {user.firstName + " " + user.lastName}
                  </div>
                </Button>
              ))}
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

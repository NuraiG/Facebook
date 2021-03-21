import { IconButton } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "./logo.png";
import SearchIcon from "@material-ui/icons/Search";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

export default function HeaderLeft() {
  return (
    <div className={styles.header__left}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <label className={styles.header__input}>
        <input
          className="primary_txt primary_bg"
          placeholder="Search Facebook"
        />
        <SearchIcon className="icon_color" />
      </label>

      <IconButton className={`${styles.icon_btn} secondary_button_bg secondary_txt`}>
        <MenuRoundedIcon />
      </IconButton>
    </div>
  );
}

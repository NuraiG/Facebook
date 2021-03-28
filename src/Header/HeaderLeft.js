import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";

// styles
import styles from "./Header.module.scss";
import { grayButtonTheme } from "../customThemes";

// Material-UI
import { ThemeProvider } from "@material-ui/core";
// Icons
import SearchIcon from "@material-ui/icons/Search";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import HeaderNavOption from "./HeaderNavOption";

export default function HeaderLeft() {
  let [btnSelected, setBtnSelected] = useState(false);

  let onSelect = () => {
    setBtnSelected(!btnSelected);
    // TODO: open/close mobile menu
  };

  return (
    <div className={styles.header__left}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <label className={styles.header__input}>
        <input placeholder="Search Facebook" />
        <SearchIcon />
      </label>

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

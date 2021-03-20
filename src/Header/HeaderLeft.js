import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "./logo.png";
import SearchIcon from "@material-ui/icons/Search";

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
    </div>
  );
}

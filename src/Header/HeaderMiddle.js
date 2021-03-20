import React from "react";
import styles from "./Header.module.css";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import HeaderNavOption from "./HeaderNavOption";

export default function HeaderMiddle() {
  return (
    <ul className={`${styles.header__middle} icon_color`}>
      <HeaderNavOption
        startingState={true}
        outline={<HomeOutlinedIcon className="hover_col" fontSize="large"/>}
        filled={<HomeRoundedIcon className="hover_col" fontSize="large"/>}
      />
      <HeaderNavOption
        startingState={false}
        outline={<PeopleAltOutlinedIcon className="hover_col" fontSize="large"/>}
        filled={<PeopleAltIcon className="hover_col" fontSize="large"/>}
      />
    </ul>
  );
}

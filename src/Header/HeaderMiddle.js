import React, { useState } from "react";
import HeaderNavOption from "./HeaderNavOption";

// styles
import styles from "./Header.module.scss";
import { grayButtonTheme } from "../customThemes";

// Material-UI
import { ThemeProvider } from "@material-ui/styles";
// Icons
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

export default function HeaderMiddle() {
  let [allHeaderOptions, setAllHeaderOptions] = useState([
    {
      tooltip: "Home",
      selected: true,
      outline: <HomeOutlinedIcon color="secondary" fontSize="large" />,
      filled: <HomeRoundedIcon fontSize="large" />,
      linkTo: "/"
    },
    {
      tooltip: "Friends",
      selected: false,
      outline: <PeopleAltOutlinedIcon color="secondary" fontSize="large" />,
      filled: <PeopleAltIcon fontSize="large" />,
      linkTo: "/friends"
    },
  ]);

  let onSelect = (tooltip) => {
    return () => {
      setAllHeaderOptions(
        allHeaderOptions.map((option) => {
          option.tooltip === tooltip
            ? (option.selected = true)
            : (option.selected = false);
          return option;
        })
      );
    };
  };

  return (
    <ThemeProvider theme={grayButtonTheme}>
      <div className={styles.header__middle}>
        {allHeaderOptions.map((option) => (
          <HeaderNavOption
            key={option.tooltip}
            className={styles.header_btn}
            selected={option.selected}
            tooltip={option.tooltip}
            outline={option.outline}
            filled={option.filled}
            onClick={onSelect(option.tooltip)}
            linkTo={option.linkTo}
          />
        ))}
      </div>
    </ThemeProvider>
  );
}

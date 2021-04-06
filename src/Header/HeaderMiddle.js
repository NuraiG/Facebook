import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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

export default function HeaderMiddle({activeTab}) {
  const { t } = useTranslation();

  let [allHeaderOptions, setAllHeaderOptions] = useState([
    {
      key: "Home",
      tooltip: <h6>{t("header.home")}</h6>,
      selected: activeTab === "home",
      outline: <HomeOutlinedIcon color="secondary" fontSize="large" />,
      filled: <HomeRoundedIcon fontSize="large" />,
      linkTo: "/"
    },
    {
      key: "Friends",
      tooltip: <h6>{t("header.friends")}</h6>,
      selected: activeTab === "friends",
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
            key={option.key}
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

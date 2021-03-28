import React from "react";
import HeaderLeft from "./HeaderLeft";
import HeaderMiddle from "./HeaderMiddle";
import HeaderRight from "./HeaderRight";

// styles
import styles from "./Header.module.scss";
import { grayTheme } from "../customThemes";

// Material-UI
import { AppBar, Toolbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

export default function Header({activeTab = "home"}) {
  return (
    <ThemeProvider theme={grayTheme}>
      <AppBar position="sticky" color="secondary" className={styles.header}>
        <Toolbar className={styles.header__wrapper}>
          <div className={styles.header__container}>
            <HeaderLeft />
            <HeaderMiddle activeTab={activeTab}/>
            <HeaderRight />
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

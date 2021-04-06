import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import facebook from "../../LoginPage/facebook-loginPage.svg";
import { ThemeProvider } from "@material-ui/core";
import { globalTheme, blueGreenTheme } from "../../customThemes";
import styles from "./Loader.module.scss";

export default function Loader() {
  return (
    <ThemeProvider theme={globalTheme}>
      {" "}
      <div className={styles.loader}>
        {" "}
        <img src={facebook} alt="Facebook"></img>{" "}
        <ThemeProvider theme={blueGreenTheme}>
          <CircularProgress color="primary" className={styles.progress} size="10" />{" "}
        </ThemeProvider>
      </div>{" "}
    </ThemeProvider>
  );
}

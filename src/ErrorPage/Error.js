import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../Header/Header";

import styles from "./Error.module.scss";
import error from "./404_error.svg";
import { Button, Grid, Link } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { customButtonBlueGreen } from "../customThemes";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

export default function Error() {
  const { t } = useTranslation();
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <div>
      <Header activeTab="none" />
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <div className={styles.container}>
            <img src={error} alt="Error" className={styles.error}></img>
            <h1>{t("errorPage.heading")}</h1>
            <p>{t("errorPage.message")}</p>
            <ThemeProvider theme={customButtonBlueGreen}>
              <Button
                color="primary"
                variant="contained"
                size="medium"
                onClick={() => {
                  history.push("/");
                }}
                style={{ fontSize: "14px" }}
              >
                {t("errorPage.toNewsfeed")}
              </Button>
              <Typography>
                <Link
                  onClick={() => {
                    goBack();
                  }}
                  className={styles.cursor}
                >
                  {t("errorPage.back")}
                </Link>
              </Typography>
              <Typography>
                <Link href="https://www.facebook.com/help">
                  {t("errorPage.helpCenter")}
                </Link>
              </Typography>
            </ThemeProvider>
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}

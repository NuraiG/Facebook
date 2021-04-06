import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "./SideNavigation.module.scss";
import { Avatar, Button } from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

export default function SideNavigation() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const { t } = useTranslation();

  return (
    <aside className={styles.container}>
      <Button
        className={styles.btn}
        fullWidth
        startIcon={<Avatar src={currentUser.profile_image} />}
        component={Link}
        to={`profile/${currentUser.id}`}
      >
        {currentUser.firstName} {currentUser.lastName}
      </Button>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
        className={styles.link}
      >
        <Button
          className={styles.btn}
          fullWidth
          startIcon={<LocalHospitalIcon className={styles.hospital_icon} />}
        >
          {t("homePage.covidInfo")}
        </Button>
      </a>
      <Button
        className={styles.btn}
        fullWidth
        startIcon={<PeopleAltIcon className={styles.friends_icon} />}
        component={Link}
        to="/friends"
      >
        {t("homePage.friends")}
      </Button>
    </aside>
  );
}

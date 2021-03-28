import React from "react";
import { Link } from "react-router-dom";
import styles from "./SideNavigation.module.scss";
import { Avatar, Button } from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

import { currentUser } from "../staticData";

export default function SideNavigation() {
  return (
    <aside className={styles.container}>
      <Button
        className={styles.btn}
        fullWidth
        startIcon={<Avatar />}
        component={Link}
        to={`profile/${currentUser.id}`}
      >
        John Doe
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
          COVID-19 Information Center
        </Button>
      </a>
      <Button
        className={styles.btn}
        fullWidth
        startIcon={<PeopleAltIcon className={styles.friends_icon} />}
        component={Link}
        to="/friends"
      >
        Friends
      </Button>
    </aside>
  );
}

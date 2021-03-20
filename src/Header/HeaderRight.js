import { Avatar, IconButton } from '@material-ui/core';
import React from 'react';
import styles from "./Header.module.css";

import AddIcon from '@material-ui/icons/Add';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';

export default function HeaderRight() {
    return (
        <div className={styles.header__right}>
            <div className={`${styles.header__info} hover_col`}>
                <Avatar />
                <h4>John</h4>
            </div>

            <IconButton className={`${styles.icon_btn} hover_btn secondary_button_bg secondary_txt`}>
                <AddIcon />
            </IconButton>
            <IconButton className={`${styles.icon_btn} hover_btn secondary_button_bg secondary_txt`}>
                <ChatRoundedIcon />
            </IconButton>
            <IconButton className={`${styles.icon_btn} hover_btn secondary_button_bg secondary_txt`}>
                <NotificationsRoundedIcon />
            </IconButton>
            <IconButton className={`${styles.arrow_btn} hover_btn secondary_button_bg secondary_txt`}>
                <ArrowDropDownRoundedIcon fontSize="large"/>
            </IconButton>
        </div>
    )
}

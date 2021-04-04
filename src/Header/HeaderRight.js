import React, {useRef, useState} from "react";
import AvatarComponent from "../common/SmallAvatar/AvatarComponent";

import styles from "./Header.module.scss";
import {grayButtonTheme} from "../customThemes";

import {Link} from "react-router-dom";


// Material-UI
import {
    IconButton,
    ThemeProvider,
    Tooltip,
    Card,
    Button
} from "@material-ui/core";

// Icons
import AddIcon from "@material-ui/icons/Add";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import PopperComponent from "./PopperComponent";
import NotificationsPopupContent from "./NotificationsPopupContent";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

import {logout} from "../service";



export default function HeaderRight() {
    const [openNotifications, setOpenNotifications] = useState(false);
    const notificationsRef = useRef(null);

    const [openAccount, setOpenAccount] = useState(false);
    const anchorRef = useRef(null);


    const handleOpenNotifications = () => {
        console.log(notificationsRef);
        setOpenNotifications(true);
    };

    const handleCloseNotifications = (event) => {
        if (notificationsRef.current && notificationsRef.current.contains(event.target)) {
            return;
        }
        setOpenNotifications(false);
    };

    const handleOpenLogout = () => {
        console.log(anchorRef);
        setOpenAccount(true);
    }

    const handleCloseLogout = (ev) => {
        // if (
        // anchorRef.current &&
        // anchorRef.current.contains(ev.target)
        // ) {
        // return;
        // }
        setOpenAccount(false);
    }

    const logOut = () => {
        logout();
    }
    return (
        <div className={
            styles.header__right
        }>
            <ThemeProvider theme={grayButtonTheme}>
                <AvatarComponent className={
                        `${
                            styles.header__info
                        }`
                    }
                    showFullName={false}/>
                <Tooltip title={
                        <h6>Create</h6>
                    }
                    placement="bottom">
                    <IconButton color="primary"
                        className={
                            `${
                                styles.icon_btn
                            }`
                        }
                        // ref={anchorRef}
                        // aria-controls={open ? "menu-list-grow" : undefined}
                        // aria-haspopup="true"
                        // onClick={handleOpen}
                    >
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={
                        <h6>Messenger</h6>
                    }
                    placement="bottom">
                    <IconButton color="primary"
                        className={
                            `${
                                styles.icon_btn
                            }`
                        }
                        // ref={anchorRef}
                        // aria-controls={open ? "menu-list-grow" : undefined}
                        // aria-haspopup="true"
                        // onClick={handleOpen}
                    >
                        <ChatRoundedIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={
                        <h6>Notifications</h6>
                    }
                    placement="bottom">
                    <IconButton color="primary"
                        className={
                            `${
                                styles.icon_btn
                            }`
                        }
                        ref={notificationsRef}
                        aria-controls={
                            openNotifications ? "menu-list-grow" : undefined
                        }
                        aria-haspopup="true"
                        onClick={handleOpenNotifications}>
                        <NotificationsRoundedIcon/>
                    </IconButton>
                </Tooltip>
                <PopperComponent open={openNotifications}
                    anchorEl={
                        notificationsRef.current ? notificationsRef : undefined
                    }
                    handleClose={handleCloseNotifications}>
                    <NotificationsPopupContent/>
                </PopperComponent>
                <Tooltip title={
                        <h6>Account</h6>
                    }
                    placement="bottom">
                    <IconButton color="primary"
                        className={
                            `${
                                styles.arrow_btn
                            }`
                        }
                        ref={anchorRef}
                        aria-controls={
                            openAccount ? "menu-list-grow" : undefined
                        }
                        aria-haspopup="true"
                        onClick={handleOpenLogout}>
                        <ArrowDropDownRoundedIcon fontSize="large"/>
                    </IconButton>
                </Tooltip>
                <PopperComponent open={openAccount}
                    anchorEl={
                        anchorRef.current
                    }
                    handleClose={handleCloseLogout}>
                    <Card>
                        <Link to="/login">
                            <Button onClick={
                                    () => logOut()
                                }
                                fullWidth
                                style={
                                    {fontSize: '14px'}
                                }
                                startIcon={<ExitToAppRoundedIcon/>}>Log Out</Button>
                        </Link>
                    </Card>
                </PopperComponent>
            </ThemeProvider>
        </div>
    );
}

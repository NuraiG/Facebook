import React from 'react';
import {TextField, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
    return (
        <>
            <form className={
                    styles.login
                }
                autoComplete="off">
                <div className={
                    styles.input
                }>
                    <TextField id="outlined-basic" placeholder="Имейл или телефонен номер" variant="outlined"/>
                </div>
                <div className={
                    styles.input
                }>
                    <TextField id="outlined-basic" placeholder="Парола" variant="outlined"/>
                </div>
                <div classes={
                    styles.btnBlue
                }>
                    <Button variant="contained" size="large">
                        ВХОД
                    </Button>
                </div>
                <Link to='/forgottenPassword'>Забравена парола ?</Link>
                <div className={
                    styles.line
                }></div>
                {/* import modal for register */}
                <div classes={
                    styles.btnBlue
                }>
                    <Button variant="contained"
                        className={
                            styles.btnGreen
                        }
                        size="large">
                        Създаване на нов профил
                    </Button>
                </div>
            </form>
        </>
    )
}

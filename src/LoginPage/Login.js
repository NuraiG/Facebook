import React from 'react';
import {TextField, Divider} from '@material-ui/core';
import {Link} from 'react-router-dom';
import styles from './Login.module.css';
import BlueButton from './BlueButton';
import GreenButton from './GreenButton';
import Registration from './Registration';
import Dialog from '@material-ui/core/Dialog';


export default function Login() {

    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    function handleClose() {
        setOpen(false);
    }
    return (
        <>
            <form className={
                    styles.login
                }
                autoComplete="off">
                <div className={
                    styles.input
                }>
                    <TextField id="email"
                        value={email}
                        placeholder="Имейл"
                        variant="outlined"
                        required/>
                    <TextField id="password"
                        value={password}
                        placeholder="Парола"
                        variant="outlined"
                        required
                        type="password"/>
                </div>
                {/* todo: create 1 custom button */}
                <BlueButton>ВХОД</BlueButton>
                <Link to='/forgottenPassword'>Забравена парола ?</Link>
                <Divider flexItem/> {/* todo: fix the bug && create 1 custom button */}
                <GreenButton onClick={handleOpen}>Създаване на нов профил</GreenButton>
                <Dialog open={open}
                    onClose={handleClose}>
                    <Registration></Registration>
                </Dialog>
            </form>
        </>
    )
}

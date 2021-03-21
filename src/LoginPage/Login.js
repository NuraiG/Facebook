import React from 'react';
import {TextField, Divider} from '@material-ui/core';
import {Link} from 'react-router-dom';
import styles from './Login.module.css';
import BlueButton from './BlueButton';
import GreenButton from './GreenButton';
import Modal from '@material-ui/core/Modal';
import Registration from './Registration';


export default function Login() {

    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
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
                    <TextField id="outlined-basic" placeholder="Имейл" variant="outlined" required/>
                    <TextField id="outlined-basic" placeholder="Парола" variant="outlined" required type="password"/>
                </div>
                <BlueButton>ВХОД</BlueButton>
                <Link to='/forgottenPassword'>Забравена парола ?</Link>
                <Divider flexItem/> {/* import modal for register */}
                <GreenButton onClick={
                        handleOpen
                }>Създаване на нов профил</GreenButton>

                <Modal open={open}
                    onClose={handleClose}>
                    <Registration></Registration>
                </Modal>

            </form>
        </>
    )
}

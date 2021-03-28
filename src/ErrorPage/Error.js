import Header from '../Header/Header';
import React from 'react';
import styles from './Error.module.scss';
import error from './404_error.svg';
import { Button, Grid, Link } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { customButtonBlueGreen } from '../customThemes';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';

export default function Error() {
	const history = useHistory();
	const goBack=()=>{
		history.goBack();
	}
	return (
		<div>
			<Header />
			<Grid container>
				<Grid item xs={4}></Grid>
				<Grid item xs={4}>
					<div className={styles.container}>
						<img src={error} alt="Error" className={styles.error}></img>
						<h1>This page isn't available</h1>
						<p>
							The link may be broken, or the page may have been removed. Check to see if the link you're
							trying to open is correct.
						</p>
						<ThemeProvider theme={customButtonBlueGreen}>
								<Button color="primary" variant="contained" size="medium"  onClick={()=>{ history.push('/')}}>
									Go to News Feed
								</Button>
							<Typography>
								<Link onClick={()=>{goBack()}} className={styles.cursor}>Go Back</Link>
							</Typography>
							<Typography>
								<Link href="https://www.facebook.com/help">Visit Help Centre</Link>
							</Typography> 
						</ThemeProvider>
					</div>
				</Grid>
				<Grid item xs={4}></Grid>
			</Grid>
		</div>
	);
}
import React from 'react'
import Header from '../Header/Header'
import {useParams} from "react-router-dom";
import ProfileHeader from './ProfileHeader';
import {Grid} from '@material-ui/core';


export default function Profile() {

    const {id} = useParams();

    return (
        <div>
            <Header/>
            <Grid container>
                <Grid item
                    xs={2}>
                    <h2>Profile {id}</h2>
                </Grid>
                <Grid item
                    xs={8}>
                    <ProfileHeader/>
                </Grid>
                <Grid item
                    xs={2}></Grid>
            </Grid>

        </div>
    )
}

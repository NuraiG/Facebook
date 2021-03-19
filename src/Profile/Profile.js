import React from 'react'
import Header from '../Header/Header'
import { useParams } from "react-router-dom";


export default function Profile() {

    const { id } = useParams();

    return (
        <div>
            <Header />
            <h2>Profile {id}</h2>
        </div>
    )
}

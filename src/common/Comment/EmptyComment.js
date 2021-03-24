import React from 'react';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import InsertEmoticonSharpIcon from '@material-ui/icons/InsertEmoticonSharp';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import styles from './EmptyComment.module.scss';

export default function EmptyComment() {
    return (
        <>
            <div className={
                styles.emptyComment
            }>
                <Avatar alt="Remy Sharp" src="https://dthezntil550i.cloudfront.net/1f/latest/1f1812170212508330007997070/494e2362-6d3c-40b3-8bf5-192fcea38a2f.png"/>
                <TextField id="standard-textarea" label="Your comment" placeholder="Write a comment"size="large"/>
                <InsertEmoticonSharpIcon style={
                    {fill: "gray"}
                }/>
                <PhotoCameraOutlinedIcon style={
                    {fill: "gray"}
                }/>
            </div>
        </>
    )
}
import React, {useState} from 'react';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import InsertEmoticonSharpIcon from '@material-ui/icons/InsertEmoticonSharp';
import Avatar from '@material-ui/core/Avatar';
import styles from './EmptyComment.module.scss';

export default function EmptyComment(postId, authorName, authorId, authorImage) {
    const [comment, setComment] = useState("");
    const addComment = () => {
        if (comment.length) {
            setComment("");
            // add to commenst of a post with id === postId;!!!!
            // comment{
            // body:comment,
            // author:authorId, from id we get can a user image and user name;
            // likes:0// 0 initial value;
            // toPost: postId
            // }
        }
    }
    const addSmileToComment = () => {
        let add = comment + ' :) ';
        setComment(add);
    }
    const addImageToComment = () => {}
    // todo;add image to comment
    return (
        <div className={
            styles.emptyComment
        }>
            <div className={
                styles.commentAuthor
            }>
                <Avatar // alt={authorName}
                    alt='avatar'
                    src={authorImage}/>
            </div>
            <form>
                <input type="text" id="input"
                    value={comment}
                    label="Your comment here"
                    placeholder="Write a comment..."
                    onChange={
                        (ev) => setComment(ev.target.value)
                    }/>
                <div className={
                    styles.optional
                }>
                    <InsertEmoticonSharpIcon style={
                            {fill: "gray"}
                        }
                        onClick={addSmileToComment}/>
                    <PhotoCameraOutlinedIcon style={
                            {fill: "gray"}
                        }
                        onClick={addImageToComment}/>
                </div>
                <button type="submit"
                    onClick={
                        (ev) => {
                            ev.preventDefault();
                            addComment()
                        }
                }></button>
        </form>
    </div>
    )
}

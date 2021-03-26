import Avatar from '@material-ui/core/Avatar';
import styles from './Comment.module.scss';
import {Link} from "react-router-dom";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {useState, useCallback, useEffect} from 'react';

export default function Comment(body, authorName, authorImage, likes) {
    authorName = 'Tom Herzler';
    likes = ['Tom', 'George', 'Alice'];
    // likes=[];
    body = "I like it";
    authorImage = 'https://dthezntil550i.cloudfront.net/1f/latest/1f1812170212508330007997070/494e2362-6d3c-40b3-8bf5-192fcea38a2f.png';

    const [isLiked, setIsLiked] = useState(0);
    // to like or unlike the comment
    const toggle = useCallback(() => setIsLiked(!isLiked), [
        isLiked, setIsLiked
    ],);
    // const changeTheLikes = useEffect(() => {
    //     if (isLiked) {
    //         // push current user
    //     } else {
    //         //unshift current user from likes
    //     }
    // }, [])


    const truncateString = (description, maxLength) => {
        if (!description) 
            return null;
        if (description.length <= maxLength) 
            return description;
        return `${
            description.substring(0, maxLength)
        }...`;
    }
    const addLikes = () => {
        toggle();
        // modify the likes array;
    }
    return (
        <div className={
            styles.commentWrapper
        }>
            <div className={
                styles.imageWrapper
            }>
                <Link to='/'>
                    <Avatar alt={authorName}
                        src={authorImage}/>
                </Link>
            </div>
            <div className={
                styles.comment
            }>
                <div className={
                    styles.commentBody
                }>
                    <p> {authorName}</p>
                    <div> {
                        truncateString(body, 100)
                    }</div>
                    {
                    likes.length ? <div className={
                        styles.likes
                    }>
                        <div className={
                            styles.likeicon
                        }>
                            <ThumbUpAltIcon fontSize='small'/>
                        </div>
                        <span>{
                            likes.length
                        }</span>
                    </div> : null
                } </div>
                {
                isLiked ? <button onClick={
                    () => addLikes()
                }>Unlike</button> : <button onClick={
                    () => addLikes()
                }>Like</button>
            } </div>
        </div>
    )
}
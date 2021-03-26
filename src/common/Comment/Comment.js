import Avatar from '@material-ui/core/Avatar';
import styles from './Comment.module.scss';
import {Link} from "react-router-dom";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {useState, useCallback} from 'react';

export default function Comment(commentId, author, authorName, likes,content,timestamp,images,authorPhoto) {
    authorName = 'Tom Herzler';
    likes = ['Tom', 'George', 'Alice'];
    // likes=[];
    content = "I like it";
    authorPhoto = 'https://dthezntil550i.cloudfront.net/1f/latest/1f1812170212508330007997070/494e2362-6d3c-40b3-8bf5-192fcea38a2f.png';

    const [isLiked, setIsLiked] = useState(0);
    // to like or unlike the comment
    const toggle = useCallback(() => setIsLiked(!isLiked), [
        isLiked, setIsLiked
    ],);

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
                        src={authorPhoto}/>
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
                        truncateString(content, 100)
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
                        <p>{
                            likes.length
                        }</p>
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
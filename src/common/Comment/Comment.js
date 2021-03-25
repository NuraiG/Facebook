import Avatar from '@material-ui/core/Avatar';
import styles from './Comment.module.scss';
import {Link} from "react-router-dom";

export default function Comment(body, authorName, authorImage, likes) {
    authorName = 'Tom Herzler';
    likes = ['Tom', 'George', 'Azis'];
    body = "Waoww gjdshfdshjgdfsdfdgdfhgfhjuyjtyeurytesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss ";
    authorImage = 'https://dthezntil550i.cloudfront.net/1f/latest/1f1812170212508330007997070/494e2362-6d3c-40b3-8bf5-192fcea38a2f.png';

    const truncateString = (description, maxLength) => {
        if (!description) 
            return null;
        if (description.length <= maxLength) 
            return description;
        return `${
            description.substring(0, maxLength)
        }...`;
    }
    // todo: add likes, likes'length on click show the userNames
    const addLikes=()=>{
        // ++this.comment.likes;
        likes.push('Mari');
        // likes.push(currentUser.name);
    }
    return (
        <div className={
            styles.commentWrapper
        }>
            <div className={
                styles.imageWrapper
            }>
                <Link to='/profile/'>
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
                </div>
                <button onClick={()=>addLikes()}>Like</button>
                <span>{likes.length}</span>
            </div>
        </div>
    )
}
import React, {useState, useCallback} from "react";
import {useSelector} from "react-redux";
import { useTranslation } from "react-i18next";

// material icons
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import InsertEmoticonSharpIcon from "@material-ui/icons/InsertEmoticonSharp";

// material ui
import {Avatar} from "@material-ui/core";

import styles from "./EmptyComment.module.scss";

import {useDropzone} from "react-dropzone";
import {storage} from "../../firebase";
import {createComment} from "../../service";

import Picker from 'emoji-picker-react';

export default function EmptyComment({postId, postAuthorId}) {
    const currentUser = useSelector((state) => state.currentUser.currentUser);
    const [comment, setComment] = useState("");
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const { t } = useTranslation();

    const addComment = () => {
        if (comment.trim().length) {
            createComment(postId, postAuthorId, {
                createdById: currentUser.id,
                createdByFullName: currentUser.firstName + " " + currentUser.lastName,
                createdByPic: currentUser.profile_image || "",
                content: comment,
                attachedImages: attachedFiles
            });
            if (attachedFiles.length > 0) { 
                setAttachedFiles([]);
            }
            setComment("");
        }
    };
    const onEmojiClick = (event, emojiObject) => {
        let add;
        setChosenEmoji(emojiObject.emoji);
        chosenEmoji ? add = comment + " " + chosenEmoji + " " : add = comment;
        setComment(add);
    };

    const addSmileToComment = () => {
        setEmojiPickerOpen(true);
    };

    const onDrop = useCallback((newFiles) => {
        newFiles.forEach((file) => {
            const uploadTask = storage.ref().child("images/" + currentUser.id + Date.now()).put(file);

            uploadTask.on("state_changed", (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            }, (error) => {
                console.log(error);
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setAttachedFiles([
                        ...attachedFiles,
                        downloadURL
                    ]);
                });
            });
        });
    }, [attachedFiles, currentUser.id]);
    
    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: "image/*"});


    return (
        <div className={
            styles.emptyComment
        }>
            <div className={
                styles.commentAuthor
            }>
                <Avatar alt={
                        currentUser.firstName
                    }
                    src={
                        currentUser.profile_image
                    }/>
            </div>
            <form>
                <input type="text"
                    id={postId}
                    value={comment}
                    label="Your comment here"
                    placeholder={t("comment.emptyComment")}
                    onChange={
                        (ev) => setComment(ev.target.value)
                    }
                    multiple
                    onClick={
                        () => {
                            setEmojiPickerOpen(false)
                        }
                    }/> {
                attachedFiles.length > 0 && attachedFiles.map((file) => (
                    <div key={file}
                        className={
                            styles.attached_images_container
                    }>
                        <img alt=""
                            src={file}
                            className={
                                styles.attached_images
                            }/>
                    </div>
                ))
            }
                <div className={
                    styles.optional
                }>
                    {
                    !isEmojiPickerOpen ? <>
                        <InsertEmoticonSharpIcon style={
                                {fill: "gray"}
                            }
                            onClick={addSmileToComment}
                            fontSize="large"/>
                        <input {...getInputProps()}></input>
                        <PhotoCameraOutlinedIcon {...getRootProps({ className: "dropzone" })}
                            style={
                                {fill: "gray"}
                            }
                            fontSize="large"/>
                    </> : null
                }
                    {
                    isEmojiPickerOpen ? <Picker onEmojiClick={onEmojiClick}/> : null
                } </div>
                <button type="submit"
                    onClick={
                        (ev) => {
                            ev.preventDefault();
                            addComment();
                        }
                }></button>
        </form>
    </div>
    );
}

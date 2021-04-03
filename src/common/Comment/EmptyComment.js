import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";

// material icons
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import InsertEmoticonSharpIcon from "@material-ui/icons/InsertEmoticonSharp";
import CloseIcon from "@material-ui/icons/Close";

//material ui
import { Avatar, ThemeProvider,IconButton } from "@material-ui/core";

import styles from "./EmptyComment.module.scss";
import { grayButtonTheme } from "../../customThemes";

import { useDropzone } from "react-dropzone";
import { storage } from "../../firebase";
import { createComment } from "../../service";

export default function EmptyComment({ postId }) {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const [comment, setComment] = useState("");
  const addComment = () => {
    if (comment.trim().length) {
      createComment(postId, {
        createdById: currentUser.id,
        createdByFullName: currentUser.firstName + " " + currentUser.lastName,
        createdByPic: currentUser.profile_image || "",
        content: comment,
        attachedImages: attachedFiles,
      });
      if (attachedFiles.length > 0) {
        // TODO: add images to profile
        setAttachedFiles([]);
      }
      setComment("");
    }
  };
  const addSmileToComment = () => {
    let add = comment + " 😃";
    setComment(add);
  };

  // todo add image to comment

  let [attachedFiles, setAttachedFiles] = useState([]);
  const onDrop = useCallback(
    (newFiles) => {
      newFiles.forEach((file) => {
        const uploadTask = storage
          .ref()
          .child("images/" + currentUser.id + Date.now())
          .put(file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log("File available at", downloadURL);
              setAttachedFiles([...attachedFiles, downloadURL]);
            });
          }
        );
      });
    },
    [attachedFiles, currentUser.id]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });


  return (
    <div className={styles.emptyComment}>
      <div className={styles.commentAuthor}>
        <Avatar 
          alt={currentUser.firstName}
          src={currentUser.profile_image}
        />
      </div>
      <form>
        <input
          type="text"
          id={postId}
          value={comment}
          label="Your comment here"
          placeholder="Write a comment..."
          onChange={(ev) => setComment(ev.target.value)}
          multiple
        />
         {attachedFiles.length > 0 &&
                attachedFiles.map((file) => (
                  <div key={file} className={styles.attached_images_container}>
                    <img alt="" src={file} className={styles.attached_images} />
                  </div>
                ))}
        <div className={styles.optional}>
          <InsertEmoticonSharpIcon
            style={{ fill: "gray" }}
            onClick={addSmileToComment}
            fontSize="large"
          />
          <input {...getInputProps()}></input>
          <PhotoCameraOutlinedIcon
            {...getRootProps({ className: "dropzone" })}
            style={{ fill: "gray" }}
            fontSize="large"
          />
        </div>
        <button
          type="submit"
          onClick={(ev) => {
            ev.preventDefault();
            addComment();
          }}
        ></button>
      </form>
    </div>
  );
}

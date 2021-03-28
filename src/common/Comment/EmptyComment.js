import React, { useState, useCallback } from "react";

// material icons
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import InsertEmoticonSharpIcon from "@material-ui/icons/InsertEmoticonSharp";

//material ui
import {Avatar} from "@material-ui/core";

import styles from "./EmptyComment.module.scss";

import { useDropzone } from "react-dropzone";

export default function EmptyComment({
  postId,
  authorName,
  authorId,
  authorImage,
}) {
  const [comment, setComment] = useState("");
  const addComment = () => {
    if (comment.length) {
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
      setAttachedFiles([...attachedFiles, ...newFiles]);
    },
    [attachedFiles]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  
  return (
    <div className={styles.emptyComment}>
      <div className={styles.commentAuthor}>
        <Avatar // alt={authorName}
          alt="avatar"
          src={authorImage}
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
        <div className={styles.optional}>
          <InsertEmoticonSharpIcon
            style={{ fill: "gray" }}
            onClick={addSmileToComment}
          />
          <input {...getInputProps()}></input>
          <PhotoCameraOutlinedIcon
            {...getRootProps({ className: "dropzone" })}
            style={{ fill: "gray" }}
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

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import SideNavigation from "../SideNavigation";
import CreatePost from "../common/CreatePost/CreatePost";
import Post from "../common/Post/Post";

import { posts } from "../staticData";
import styles from "./Home.module.scss";
import { Grid } from "@material-ui/core";
import { getAllPosts } from "../service";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home({ limit = 2 }) {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [lastLoadedId, setLastLoadedId] = useState("");

  let fetchMoreData = () => {
    console.log(lastLoadedId.id);
    let postsToReturn = [];
    if (lastLoadedId.id === "") {
      postsToReturn = allPosts.slice(0, limit);
    } else {
      let startIndex =
        allPosts.findIndex((post) => post.id === lastLoadedId.id) + 1;
      console.log(startIndex);

      postsToReturn = allPosts.slice(startIndex, startIndex + limit);
    }
    setVisiblePosts([...visiblePosts, ...postsToReturn]);
    setLastLoadedId(postsToReturn[postsToReturn.length - 1].id);
  };

  useEffect(() => {
    if (currentUser.friends) {
      getAllPosts().onSnapshot((data) => {
        let currentPosts = [];
        // let unfilteredPosts = [];
        data.forEach((post) => {
          // if the post is published on one of the currentUser's friends walls
          if (
            currentUser.friends.includes(post.data().postTargetId) ||
            post.data().postTargetId === currentUser.id ||
            post.data().createdById === currentUser.id
          ) {
            currentPosts.push({ id: post.id, ...post.data() });
          }
          // unfilteredPosts.push({ id: post.id, ...post.data() });
        });
        // TODO: figure out how to shuffle posts so that they only get shuffled once
        // let shuffledPosts = shuffleArray(currentPosts);
        let shuffledPosts = [...currentPosts];
        console.log(shuffledPosts);
        setAllPosts(shuffledPosts);

        setVisiblePosts(shuffledPosts.slice(0, 2));
        setLastLoadedId(shuffledPosts[1]);
        console.log(shuffledPosts[1].id);
      });

      // if (unshuffledPosts.length) {
      //   let shuffledPosts = shuffleArray(unshuffledPosts);
      //   console.log(shuffledPosts);
      //   setAllPosts(shuffledPosts);

      //   setVisiblePosts(shuffledPosts.slice(0, 2));
      //   setLastLoadedId(shuffledPosts[1].id);
      // }
    }
  }, [currentUser.friends, currentUser.id]);

  return (
    <div>
      <Header activeTab="home" />
      <Grid container>
        <Grid item xs={3}>
          <SideNavigation />
        </Grid>
        <Grid item xs={6} className={styles.center_container}>
          <CreatePost target={currentUser} />
          <Post postObj={posts[0]} />
          <Post postObj={posts[1]} />
          <InfiniteScroll
            dataLength={visiblePosts.length}
            next={fetchMoreData}
            hasMore={allPosts.length > visiblePosts.length}
            loader={<h4>Loading...</h4>}
          >
            {visiblePosts.map((current) => (
              <Post key={current.id} postObj={current} />
            ))}
          </InfiniteScroll>
        </Grid>
        <Grid item xs={3}>
          {/* placeholder */}
        </Grid>
      </Grid>
    </div>
  );
}

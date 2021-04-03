import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import SideNavigation from "../SideNavigation";
import CreatePost from "../common/CreatePost/CreatePost";
import Post from "../common/Post/Post";

import styles from "./Home.module.scss";
import { Grid } from "@material-ui/core";
import { getAllPosts } from "../service";
import InfiniteScroll from "react-infinite-scroll-component";
import { NUMBER_OF_POSTS_PER_SCROLL } from "../constants";

export default function Home() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [lastLoaded, setLastLoaded] = useState("");

  let fetchMoreData = () => {
    let postsToReturn = [];
    if (lastLoaded.id === "") {
      postsToReturn = allPosts.slice(0, NUMBER_OF_POSTS_PER_SCROLL);
    } else {
      let startIndex =
        allPosts.findIndex((post) => post.id === lastLoaded.id) + 1;
      postsToReturn = allPosts.slice(startIndex, startIndex + NUMBER_OF_POSTS_PER_SCROLL);
    }
    setVisiblePosts([...visiblePosts, ...postsToReturn]);
    setLastLoaded(postsToReturn[postsToReturn.length - 1]);
  };

  useEffect(() => {
    if (currentUser.friends) {
      getAllPosts().onSnapshot((data) => {
        let currentPosts = [];
        data.forEach((post) => {
          // if the post is published on one of the currentUser's friends walls
          if (
            currentUser.friends.includes(post.data().postTargetId) ||
            post.data().postTargetId === currentUser.id ||
            post.data().createdById === currentUser.id
          ) {
            currentPosts.push({ id: post.id, ...post.data() });
          }
        });
        // TODO: figure out how to shuffle posts so that they only get shuffled once
        // let shuffledPosts = shuffleArray(currentPosts);
        let shuffledPosts = [...currentPosts];
        setAllPosts(shuffledPosts);

        setVisiblePosts(shuffledPosts.slice(0, NUMBER_OF_POSTS_PER_SCROLL));
        setLastLoaded(shuffledPosts[1]);
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

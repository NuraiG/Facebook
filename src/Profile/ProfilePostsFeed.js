import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../common/Post/Post";
import { NUMBER_OF_POSTS_PER_SCROLL } from "../constants";
import { getAllPostsForUser } from "../service";
import { compareObjByDBTimestamp } from "../timeUtils";

export default function PostsFeed({ userId }) {
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
    if (userId) {
      getAllPostsForUser(userId).onSnapshot((data) => {
        let currentPosts = [];
        data.forEach((post) =>
          currentPosts.push({ id: post.id, ...post.data() })
        );
        setAllPosts(currentPosts.sort(compareObjByDBTimestamp));
        setVisiblePosts(currentPosts.slice(0, NUMBER_OF_POSTS_PER_SCROLL));
        setLastLoaded(currentPosts[1]);
      });
    }
  }, [userId]);

  return (
    <>
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
    </>
  );
}

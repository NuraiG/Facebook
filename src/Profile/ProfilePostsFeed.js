import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../common/Post/Post";
import { getAllPostsForUser } from "../service";
import { compareObjByDBTimestamp } from "../timeUtils";

export default function PostsFeed({ userId, limit = 2 }) {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [lastLoadedStr, setLastLoadedStr] = useState("");

  let fetchMoreData = () => {
    let postsToReturn = [];
    for (let i = 0; i < allPosts.length - 1; i++) {
      if (lastLoadedStr === "") {
        postsToReturn = allPosts.slice(0, limit);
        break;
      } else if (JSON.stringify(allPosts[i]) === lastLoadedStr) {
        postsToReturn = allPosts.slice(i + 1, i + 1 + limit);
        break;
      }
    }
    setPosts([...posts, ...postsToReturn]);
    setLastLoadedStr(JSON.stringify(postsToReturn[postsToReturn.length - 1]));
  };

  useEffect(() => {
    if (userId) {
      getAllPostsForUser(userId).onSnapshot((data) => {
        let currentPosts = [];
        data.forEach((post) =>
          currentPosts.push({ id: post.id, ...post.data() })
        );
        setAllPosts(currentPosts.sort(compareObjByDBTimestamp));
        setPosts(currentPosts.slice(0, 2));
        setLastLoadedStr(JSON.stringify(currentPosts[1]));
      });
    }
  }, [userId]);

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={allPosts.length > posts.length}
        loader={<h4>Loading...</h4>}
      >
        {posts.map((current) => (
          <Post key={current.id} postObj={current} />
        ))}
      </InfiniteScroll>
    </>
  );
}

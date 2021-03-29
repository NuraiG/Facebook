import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../common/Post/Post";
import { getNumberOfPostsForUser } from "../service";

export default function PostsFeed({ getPostsFunction, userId }) {
  const [posts, setPosts] = useState([]);
  const [postsCounter, setPostsCounter] = useState(0);
  const [lastLoaded, setLastLoaded] = useState(0);
  let [endFlag, setEndFlag] = useState(false);
  const [numberOfAllPosts, setNumberOfAllPosts] = useState(10);

  let fetchMoreData = () => {
    getPostsFunction("1", lastLoaded)
      .then((limitedPosts) => {
        let dbPosts = [...posts];

        limitedPosts.forEach((doc) => {
          setLastLoaded(doc);
          dbPosts.push({ id: doc.id, ...doc.data() });
        });

        setPosts(dbPosts);
        if (dbPosts.length < 2) setEndFlag(true);
        setPostsCounter(postsCounter + dbPosts.length);
      })
      .catch((error) => {
        console.log(error);
        // setEndFlag(true);
      });
  };

  useEffect(() => {
    getNumberOfPostsForUser("1").then((res) => setNumberOfAllPosts(res));
  }, []);
  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={numberOfAllPosts > posts.length}
        // hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {posts.map((current) => (
          <Post key={current.id} postObj={current} />
        ))}
      </InfiniteScroll>
    </>
  );
}

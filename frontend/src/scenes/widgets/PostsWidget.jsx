import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { useGetPosts } from "services/posts/queries";

const PostsWidget = ({ isProfile = false, posts }) => {
  // const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts);
  // const token = useSelector((state) => state.token);
  // const [posts, setPosts] = useState([])

  // const getPosts = async () => {
  //   const response = await fetch("http://localhost:3001/posts", {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await response.json();
  //   dispatch(setPosts({ posts: data }));
  // };

  // const getUserPosts = async () => {
  //   const response = await fetch(
  //     `http://localhost:3001/api/v1/posts/${userId}/posts`,
  //     {
  //       method: "GET",
  //       headers: { Authorization: `Bearer ${token}` },
  //     }
  //   );
  //   const data = await response.json();
  //   dispatch(setPosts({ posts: data }));
  // };

  // useEffect(() => {
  //   if (isProfile) {
  //     getUserPosts();
  //   } else {
  //     getPosts();
  //   }
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(()=>{
  //   setPosts(user?.post)
  // }, [user])

  // console.log(posts);

  return (
    <>
      {posts &&
        posts.length > 0 &&
        posts.map((item) => <PostWidget key={item?._id} post={item} />)}
    </>
  );
};

export default PostsWidget;

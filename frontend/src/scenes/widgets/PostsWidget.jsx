import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { useGetPosts } from "services/posts/queries";

const PostsWidget = ({ posts }) => {
  const sortedPosts = posts?.sort((a, b) => {
    return new Date(b.date_created) - new Date(a.date_created);
  });

  return (
    <>
      {sortedPosts &&
        sortedPosts.length > 0 &&
        sortedPosts.map((item) => <PostWidget key={item?._id} post={item} />)}
    </>
  );
};

export default PostsWidget;

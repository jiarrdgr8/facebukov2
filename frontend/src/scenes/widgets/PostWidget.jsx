import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdatePost } from "services/posts/queries";
import { useGetUser } from "services/users/queries";
import { setPost } from "state";

const PostWidget = ({ post }) => {
  const { _id, comments, content, date_created, image, likes, user } = post;
  const loggedInUserId = useSelector((state) => state.user._id);

  const [isComments, setIsComments] = useState(false);
  const [isFriend, setIsFriend] = useState();
  const [isLiked, setIsLiked] = useState();

  const { data: loggedUserDetails, isLoading } = useGetUser(loggedInUserId);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const { mutate: updatePost } = useUpdatePost();

  useEffect(() => {
    const friendIds = loggedUserDetails?.friends?.map((item) => item._id) || [];
    setIsFriend(friendIds.includes(user._id));

    // const likerIds = loggedUserDetails?.likes?.map((item) => item._id) || [];
    setIsLiked(likes?.includes(loggedUserDetails._id));
  }, [loggedUserDetails, post]);

  const handleLikeClick = () => {
    console.log(isLiked);
    const likerIds = loggedUserDetails?.likes?.map((item) => item._id) || [];

    if (isLiked) {
      const newLikes = likerIds?.filter((item) => item !== loggedInUserId);
      updatePost({ id: _id, values: { likes: newLikes } });
    } else {
      const newLikes = [...likerIds, loggedInUserId];
      updatePost({ id: _id, values: { likes: newLikes } });
    }
  };

  if (isLoading) return null;

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        isFriend={isFriend}
        friendId={user?._id}
        name={user?.firstName}
        subtitle={user?.location}
        avatar={user?.avatar}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {content}
      </Typography>
      {image && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={image}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            {/* <IconButton onClick={patchLike}> */}
            <IconButton onClick={handleLikeClick}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likes.length}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${_id}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;

import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";

const FriendListWidget = ({ user }) => {
  const { palette } = useTheme();
  const [friends, setFriends] = useState([]);
  const [friendsIdList, setFriendsIdList] = useState([]);

  useEffect(() => {
    setFriends(user?.friends);
    const idList =
      user?.friends &&
      user?.friends.length > 0 &&
      user?.friends.map((item) => item._id);
    setFriendsIdList(idList);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends &&
          friends.length > 0 &&
          friends.map((friend) => {
            return (
              <Friend
                isFriend={friendsIdList.find((item) => item === friend._id)}
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.occupation}
                avatar={friend.avatar}
              />
            );
          })}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;

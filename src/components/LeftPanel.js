import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import { setUser } from '../userSlice';
import { fetchUserAndPosts } from '../api/userApi';

const LeftPanel = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const posts = useSelector((state) => state.user.posts);


  const specificUserId = 1; 

  useEffect(() => {
    const getUserData = async () => {
      const { users, posts } = await fetchUserAndPosts();
      dispatch(setUser({ users, posts }));
    };

    getUserData();
  }, [dispatch]);

 
  const user = users.find((user) => user.id === specificUserId);

  if (!user) return null; 

  return (
    <div>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Avatar sx={{ width: 56, height: 56, mb: 2 }} src={user.avatar} />
          <Typography variant="h6">{user.first_name} {user.last_name}</Typography>
          <Typography variant="body2">{user.email}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">My Posts</Typography>
          <List dense>
            {posts.map((post) => (
              <ListItem key={post.id} button>
                <ListItemText primary={post.title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeftPanel;

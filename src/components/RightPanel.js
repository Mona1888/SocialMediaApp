import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Card, CardContent, Typography, TextField, Grid } from '@mui/material';
import { fetchUserAndPosts } from '../api/userApi';
import { setUser } from '../userSlice';

const RightPanel = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users || []); 
  const [searchTerm, setSearchTerm] = useState('');

  
  const filteredUsers = users.filter((user) =>
    (user.first_name + ' ' + user.last_name).toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const getUserData = async () => {
      const { users, posts } = await fetchUserAndPosts();
      dispatch(setUser({ users, posts }));
    };

    getUserData();
  }, [dispatch]);

  if (!filteredUsers || filteredUsers.length === 0) return <Typography>No users found</Typography>;

  return (
    <Card >
      <CardContent>
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CardContent>
          <Typography textAlign={"center"}>My Connections</Typography>
        </CardContent>

        <Grid container spacing={2}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card sx={{ mb: 3}} >
                <CardContent>
                  <Avatar sx={{ width: 40, height: 40, mb: 2 }} src={user.avatar} />
                  <Typography variant="h6">{user.first_name} {user.last_name}</Typography>
                  <Typography variant="body2">{user.email}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RightPanel;

import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, setUser } from '../userSlice'; 
import { useNavigate } from 'react-router-dom';
import LeftPanel from './LeftPanel';
import MiddlePanel from './MiddlePanel';
import RightPanel from './RightPanel';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); 
  
   
  useEffect(() => {
   
    const storedUser = localStorage.getItem('loginUser');
    

    if (storedUser) {
    
      dispatch(setUser(JSON.parse(storedUser)));
    } else if (!isAuthenticated) {
     
      navigate('/login');
    }
   
  }, [dispatch, isAuthenticated, navigate]);

  const handleLogout = () => {
    
    dispatch(logoutUser());
    
    localStorage.removeItem('loginUser');
   
    navigate('/');
  };

  return (
    <>
     
      <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard 
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

 
  
  <Container
        maxWidth="xl"
        sx={{
          minHeight: 'calc(100vh - 128px)', 
          padding: '20px',
          mt: '64px', 
          mb: '64px', 
          overflowY: 'auto',
        }}
      >
        <Grid container spacing={2} sx={{ height: '100%' }}>         
          <Grid item xs={12} sm={4} md={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <LeftPanel sx={{ flex: 1 }} />
          </Grid>
        
          <Grid item xs={12} sm={8} md={6} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <MiddlePanel sx={{ flex: 1 }} />
          </Grid>
         
          <Grid item xs={12} sm={4} md={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <RightPanel sx={{ flex: 1 }} />
          </Grid>
        </Grid>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          backgroundColor: '#f1f1f1',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary" align="center">
            {'© '}
            Your Website {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;

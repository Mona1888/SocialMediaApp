import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUser } from '../userSlice';


const SignupPage = () => {
    const [formData, setFormData] = useState({ fullname: '', email: '', password: '', mobile: '' });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const dispatch = useDispatch();
   

    const handleSubmit = (event) => {
        event.preventDefault();

        const { fullname, email, password, mobile } = formData;
        const userData = { fullname, email, password, mobile };

       
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];

       
        const existingUser = allUsers.find(user => user.email === email);

        if (existingUser) {
           
            setSnackbarMessage('This email is already registered. Please use a different email address.');
            setOpenSnackbar(true);
        } else {
           
            allUsers.push(userData);
            localStorage.setItem('users', JSON.stringify(allUsers));

            
            dispatch(setUser(userData));

            setSnackbarMessage('Sign Up Successful!');
            setOpenSnackbar(true);
            setFormData({ fullname: '', email: '', password: '', mobile: '' });
        
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="background.default"
        >
            <Container maxWidth="sm">
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    boxShadow={3}
                    p={4}
                    borderRadius={2}
                    bgcolor="background.paper"
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            size='small'
                            name="fullname"
                            label="Full Name"
                            margin="normal"
                            type="text"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            size='small'
                            name="email"
                            label="Email"
                            type="email"
                            margin="normal"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            size='small'
                            name="password"
                            label="Password"
                            type="password"
                            margin="normal"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            fullWidth
                            size='small'
                            name="mobile"
                            label="Mobile Number"
                            type="number"
                            margin="normal"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                            Sign Up
                        </Button>
                    </form>
                </Box>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={snackbarMessage}
                />
            </Container>
        </Box>
    );
};

export default SignupPage;

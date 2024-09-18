import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUser } from '../userSlice'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const dispatch = useDispatch();

    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        setEmail(emailValue);
        const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        setErrorEmail(!emailValue.match(emailRegex));
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!errorEmail && !errorPassword) {
            const allUsers = JSON.parse(localStorage.getItem('users')) || [];
            const user = allUsers.find(user => user.email === email && user.password === password);

           
            if (user) {
                
                setSnackbarMessage('Login successful!');
                setOpenSnackbar(true);

                
                setTimeout(() => {
                    dispatch(setUser(user));
                    localStorage.setItem('loginUser', JSON.stringify(user));
                  
                }, 2000); }
             else {
                setSnackbarMessage('Invalid email or password.');
            }
            setOpenSnackbar(true);
        } else {
            setSnackbarMessage('Please provide valid email and password.');
            setOpenSnackbar(true);
        }
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
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            size='small'
                            name="email"
                            type='email'
                            label="Email"
                            margin="normal"
                            value={email}
                            onChange={handleEmailChange}
                            error={errorEmail}
                            helperText={errorEmail ? 'Invalid email format' : ''}
                            required
                        />
                        <TextField
                            fullWidth
                            size='small'
                            name="password"
                            label="Password"
                            type="password"
                            margin="normal"
                            value={password}
                            onChange={handlePasswordChange}
                            error={errorPassword}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: '16px' }}
                        >
                            Login
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

 export default LoginPage;

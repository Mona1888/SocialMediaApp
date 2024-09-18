import React, { useState } from "react";
import { Box, Button, Container } from "@mui/material";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const Home = () => {
  const [formToggler, setFormToggler] = useState(true);

  const handleForm = () => {
    setFormToggler(!formToggler);
  };

  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ textAlign: "center", bgcolor: "background.paper", p: 3, borderRadius: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleForm}
          
        >
          {formToggler ? "Signup" : "Login"}
        </Button>
        <Box
          width="100%"
          maxWidth="500px" 
        >
          {formToggler ? <LoginPage /> : <SignupPage />}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;

import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Lock, Menu } from "@mui/icons-material";
import { useValue } from "../context/ContextProvider";
import UserIcons from "./user/UserIcons";


const Navbar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  return (
    <>
    <AppBar>
    <Container maxWidth="lg">
      <Toolbar disableGutters>
        <Box>
          <IconButton color="inherit" size="large">
            <Menu />
          </IconButton>
        </Box>
        <Typography
          variant="h6"
          component="h1"
          noWrap
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          You are Welcome!
        </Typography>
        <Typography
          variant="h6"
          component="h1"
          noWrap
          sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
        >
          Welcome !
        </Typography>
        {!currentUser ? (
          <Button
            color="inherit"
            startIcon={<Lock />}
            onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
          >
            Login
          </Button>
        ) : (
          <UserIcons />
        )}
      </Toolbar>
    </Container>
  </AppBar>
  <Toolbar/>
    
    </>
    
  );
};

export default Navbar;

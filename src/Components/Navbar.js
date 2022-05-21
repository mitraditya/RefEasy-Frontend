import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  Box,
  Button,
  Link as MaterialLink,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

export default function Navbar({ theme }) {
  const classes = {
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: 16,
    },
  };

  const pages = [
    ["Home", "/"],
    ["Referral Activity", "/referral-activity"],
    ["Find Jobs", "/find-jobs"],
    ["Referral Policy", "/referral-policy"],
    ["Referral Link", "/referral-link"],
  ];

  return (
    <AppBar position="static" sx={{ marginBottom: 10 }}>
      <CssBaseline />
      <Toolbar>
        {/* <Typography variant="h4" sx={classes.logo}>
          Navbar
        </Typography> */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "space-evenly" }}>
          {pages.map((page) => (
            <Button
              key={page[0]}
              //   onClick={handleCloseNavMenu}
              sx={{
                // marginLeft: theme.spacing(5),
                color: "white",
                display: "block",
              }}
            >
              <MaterialLink
                sx={classes.link}
                component={RouterLink}
                to={page[1]}
              >
                {page[0]}
              </MaterialLink>
            </Button>
          ))}
        </Box>
        {/* <Box sx={classes.navlinks}>
          <MaterialLink component={RouterLink} to="/" sx={classes.link}>
            Home
          </MaterialLink>
          <MaterialLink component={RouterLink} to="/about" sx={classes.link}>
            About
          </MaterialLink>
          <MaterialLink component={RouterLink} to="/contact" sx={classes.link}>
            Contact
          </MaterialLink>
          <MaterialLink component={RouterLink} to="/faq" sx={classes.link}>
            FAQ
          </MaterialLink>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
}

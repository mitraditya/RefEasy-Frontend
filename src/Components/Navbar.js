import {
  AppBar,
  CssBaseline,
  Toolbar,
  Box,
  Link as MaterialLink,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

export default function Navbar({ theme, routeName, role }) {
  const classes = {
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: 16,
    },
  };

  const pages = [
    ["HOME", "/"],
    ["REFERRAL ACTIVITY", "/referral-activity"],
    ["FIND JOBS", "/find-jobs"],
    ["REFERRAL POLICY", "/referral-policy"],
    ["APPLICATIONS", "/admin"]
  ];

   if (role !== "HR") pages.splice(4,1);

  return (
    <AppBar position="static" sx={{ marginBottom: 10 }}>
      <CssBaseline />
      <Toolbar>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "space-evenly" }}>
          {pages.map((page) => (
            <MaterialLink
              key={page[0]}
              sx={[
                classes.link,
                {
                  fontWeight: routeName === page[1] ? "bold" : "normal",
                },
              ]}
              component={RouterLink}
              to={page[1]}
            >
              {page[0]}
            </MaterialLink>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

import { Card, CssBaseline, Container, Typography, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function ReferraActivity({ theme }) {
  return (
    <Container component="main">
      <CssBaseline />
      <Card
        sx={{
          paddingTop: theme.spacing(3),
          paddingBottom: theme.spacing(3),
          marginBottom: theme.spacing(15),
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            marginBottom: theme.spacing(2),
          }}
        >
          <Typography variant="h4" color="primary.main" sx={{ fontSize: 25 }}>
            REFERRAL ACTIVITY
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "space-around" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ marginBottom: theme.spacing(0.8) }}
            >
              SHARED LINKS
            </Typography>
            <Typography variant="h5" color="primary.main">
              0
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ marginBottom: theme.spacing(0.8) }}
            >
              TOTAL REFERRRALS
            </Typography>
            <Typography variant="h5" color="primary.main">
              0
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ marginBottom: theme.spacing(0.8) }}
            >
              JOB-SPECIFIC REFERRALS
            </Typography>
            <Typography variant="h5" color="primary.main">
              0
            </Typography>
          </Box>
        </Box>
      </Card>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          marginBottom: theme.spacing(2),
        }}
      >
        <Typography variant="h4" color="primary.main" sx={{ fontSize: 25 }}>
          MY REFERRALS
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          marginBottom: theme.spacing(2),
        }}
      >
        <Typography variant="body1">
          There are no referrarals to display
        </Typography>
      </Box>
    </Container>
  );
}

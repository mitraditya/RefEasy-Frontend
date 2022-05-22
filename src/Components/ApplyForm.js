import React from "react";
import { useLocation, useParams } from "react-router";
import {
  TextField,
  Typography,
  Container,
  CssBaseline,
  Box,
  Button,
} from "@mui/material";
import Navbar from "./Navbar";
import { apply } from "../Services/ApiService";

export default function ApplyForm({ theme }) {
  const params = useParams();
  const location = useLocation();
  const refEmp = location.state?.refEmp || "";

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    applyToJob({ refLink: data.get("referralCode") });
  };

  async function applyToJob({ refLink }) {
    try {
      const response = await apply(params.id, refLink);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Navbar theme={theme} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar> */}
          <Typography
            color="black"
            fontWeight="bold"
            component="h1"
            variant="h5"
          >
            APPLY TO JOB
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="details"
              label="Details"
              name="details"
              autoComplete="details"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={refEmp}
              id="referralCode"
              label="Referral Code"
              name="referralCode"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <Typography variant="body2" component="p" fontWeight="bold">
                Apply
              </Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

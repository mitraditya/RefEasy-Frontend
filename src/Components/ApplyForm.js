import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import {
  TextField,
  Typography,
  Container,
  CssBaseline,
  Box,
  Button,
  Alert,
  Collapse,
} from "@mui/material";
import Navbar from "./Navbar";
import { apply } from "../Services/ApiService";
import { useNavigate } from "react-router-dom";

export default function ApplyForm({ theme }) {
  const params = useParams();
  const location = useLocation();
  const refEmp = location.state?.refEmp || "";
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    applyToJob({ refLink: data.get("referralCode") });
  };

  async function applyToJob({ refLink }) {
    try {
      const response = await apply(params.id, refLink);
      console.log(response.data);
      setOpen(true);
      setTimeout(() => {
        navigate("/referral-activity");
      }, 2500);
    } catch (error) {
      console.log(error);
      alert("You have already applied to this job!");
    }
  }

  return (
    <>
      <Navbar theme={theme} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Collapse in={open}>
          <Alert sx={{ mb: 3 }}>Successfully Applied.</Alert>
        </Collapse>
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

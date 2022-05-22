import { CssBaseline, Container, Typography, Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { refer } from "../Services/ApiService";

export default function Job({ theme, role }) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const refEmp = location.state?.refEmp || "";
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [loc, setLoc] = useState("");

  useEffect(() => {
    fetch(`https://refeasy.pythonanywhere.com/api/jobs/details/${params.id}`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setTitle(data.title);
        setDate(data.created_at);
        setDesc(data.description);
        setCategory(data.department);
        setType(data.position_type);
        setLoc(data.location);
      });
  }, [params.id]);

  const routeName = `/job/${params.id}`;

  function applyToJob() {
    console.log(refEmp);
    navigate(`/job/${params.id}/apply/`, { state: { refEmp: refEmp } });
  }
  const referJob = async () => {
    try {
      const response = await refer(params.id);
      console.log(response.data);
      alert(`Share this referral link: ${response.data.referral_link}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar theme={theme} routeName={routeName} />
      <Container component="main">
        <CssBaseline />
        <Typography variant="body1" >
          Posted {new Date(date).toLocaleDateString()}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h3"
            sx={{ marginTop: 3 }}
          >
            {title}
          </Typography>
          {role === "APP" ? (
            <Button
              sx={{ height: 50 }}
              variant="contained"
              onClick={applyToJob}
            >
              Apply
            </Button>
          ) : (
            <Button sx={{ height: 50 }} variant="contained" onClick={referJob}>
              Refer
            </Button>
          )}
        </Box>
        <Typography
          variant="body1"
          sx={{ marginTop: 3 }}
        >
          {loc}
        </Typography>
        <Typography variant="h4" color="primary.main" sx={{ marginTop: 3 }}>
          JOB ID
        </Typography>
        <Typography
          variant="h5"
          sx={{ marginTop: 1 }}
        >
          {params.id}
        </Typography>
        <Typography variant="h4" color="primary.main" sx={{ marginTop: 3 }}>
          JOB CATEGORY
        </Typography>
        <Typography
          variant="h5"
          sx={{ marginTop: 1 }}
        >
          {category}
        </Typography>
        <Typography variant="h4" color="primary.main" sx={{ marginTop: 3 }}>
          JOB TYPE
        </Typography>
        <Typography
          variant="h5"
          sx={{ marginTop: 1 }}
        >
          {type}
        </Typography>
        <Typography variant="h4" color="primary.main" sx={{ marginTop: 3 }}>
          JOB DESCRIPTION
        </Typography>
        <Typography
          variant="h5"
          sx={{ marginTop: 1, marginRight: 2 }}
        >
          {desc}
        </Typography>
      </Container>
    </>
  );
}

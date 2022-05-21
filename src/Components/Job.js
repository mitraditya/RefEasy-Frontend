import { CssBaseline, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

export default function Job({ theme }) {
  const params = useParams();
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

  return (
    <>
      <Navbar theme={theme} routeName={routeName} />
      <Container component="main">
        <CssBaseline />
        <Typography variant="body1" gutterBottom component="div">
          Posted {new Date(date).toLocaleDateString()}
        </Typography>
        <Typography variant="h3" gutterBottom component="div" sx={{marginTop: 3}}>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom component="div" sx={{marginTop: 3}}>
          {loc}
        </Typography>
        <Typography variant="h4" color="primary.main" sx={{ marginTop: 3 }}>
          JOB ID
        </Typography>
        <Typography variant="h5" gutterBottom component="div" sx={{marginTop: 1}}>
          {params.id}
        </Typography>
        <Typography variant="h4" color="primary.main" sx={{ marginTop: 3 }}>
          JOB CATEGORY
        </Typography>
        <Typography variant="h5" gutterBottom component="div" sx={{marginTop: 1}}>
          {category}
        </Typography>
        <Typography variant="h4" color="primary.main" sx={{ marginTop: 3 }}>
          JOB TYPE
        </Typography>
        <Typography variant="h5" gutterBottom component="div" sx={{marginTop: 1}}>
          {type}
        </Typography>
        <Typography variant="h4" color="primary.main" sx={{ marginTop: 3 }}>
          JOB DESCRIPTION
        </Typography>
        <Typography variant="h5" gutterBottom component="div" sx={{marginTop: 1}}>
          {desc}
        </Typography>
      </Container>
    </>
  );
}

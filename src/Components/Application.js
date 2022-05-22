import {
  CssBaseline,
  Container,
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const statuses = [
  {
    value: "L01",
    label: "Level-1",
  },
  {
    value: "L02",
    label: "Level-2",
  },
  {
    value: "L03",
    label: "Level-3",
  },
  {
    value: "L04",
    label: "Level-4",
  },
  {
    value: "L05",
    label: "Level-5",
  },
  {
    value: "ACC",
    label: "Accepted",
  },
  {
    value: "REJ",
    label: "Rejected",
  },
];

export default function Application({ theme }) {
  const params = useParams();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [job_id, setJobId] = useState("");
  const [ref, setRef] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("https://refeasy.pythonanywhere.com/api/refer/all-referrals/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((data) => data.json())
      .then((data) => {
          console.log(data);
        data.results.forEach((element) => {
          if (element.id == params.id) {
            console.log(element);
            setName(
              `${element.applicant.user.first_name} ${element.applicant.user.last_name}`
            );
            setDate(element.created_at);
            setEmail(element.applicant.email);
            setJobId(element.job.slug);
            setRef(element.ref_emp.email);
            setStatus(element.status);
          }
        });
      });
  }, [params.id]);

  const routeName = `/job/${params.id}`;

  const handleChange = (event) => {
    setStatus(event.target.value);
    
    fetch("https://refeasy.pythonanywhere.com/api/refer/updatestatus/", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
          job_slug: job_id,
          app_email: email,
          status: event.target.value
      })
    });
  };

  return (
    <>
      <Navbar theme={theme} routeName={routeName} />
      <Container component="main">
        <CssBaseline />
        <Typography variant="h5" gutterBottom component="div">
          Application id: {params.id}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ marginTop: 2 }}
        >
          Applicant Name: {name}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ marginTop: 2 }}
        >
          Applied on: {new Date(date).toLocaleDateString()}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ marginTop: 2 }}
        >
          Applicant Email: {email}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ marginTop: 2 }}
        >
          Applied to job: {job_id}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ marginTop: 2 }}
        >
          Referred by: {ref}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{
            marginTop: 4,
            display: "inline-block",
            marginRight: "10px",
          }}
        >
          Status:
        </Typography>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Status
          </InputLabel>
          <NativeSelect
            value={status}
            inputProps={{
              name: "Status",
              id: "uncontrolled-native",
            }}
            onChange={handleChange}
          >
            {statuses.map((element) => {
              return <option value={element.value}>{element.label}</option>;
            })}
          </NativeSelect>
        </FormControl>
      </Container>
    </>
  );
}

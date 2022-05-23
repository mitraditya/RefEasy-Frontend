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
import ConfirmBox from "./ConfirmBox";

const statuses = [
  {
    label: "Level-1",
  },
  {
    label: "Level-2",
  },
  {
    label: "Level-3",
  },
  {
    label: "Level-4",
  },
  {
    label: "Level-5",
  },
  {
    label: "Accepted",
  },
  {
    label: "Rejected",
  },
];

export default function Application({ theme, role }) {
  const params = useParams();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [jobId, setJobId] = useState("");
  const [ref, setRef] = useState("");
  const [status, setStatus] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [open, setOpen] = useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const routeName = `/job/${params.id}`;

  const handleChange = (event) => {
    handleClickOpen();
    setCopyStatus(event.target.value);
  };

  const handleYes = () => {
    setStatus(copyStatus);

    fetch("https://refeasy.pythonanywhere.com/api/refer/updatestatus/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        job_slug: jobId,
        app_email: email,
        status: copyStatus,
      }),
    });
    handleClose();
  };

  return (
    <>
      <Navbar theme={theme} routeName={routeName} role={role} />
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
          Applied to job: {jobId}
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
              return <option value={element.label}>{element.label}</option>;
            })}
          </NativeSelect>
        </FormControl>
      </Container>
      <ConfirmBox
        title="Are you sure you want to update the status?"
        open={open}
        handleYes={handleYes}
        handleClose={handleClose}
      />
    </>
  );
}

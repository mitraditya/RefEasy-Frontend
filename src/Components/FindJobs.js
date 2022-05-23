import { CssBaseline, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    field: "created_at",
    headerName: "DATE",
    width: 250,
    valueFormatter: (params) => {
      return new Date(params.value).toLocaleDateString();
    },
  },
  { field: "slug", headerName: "JOB ID", width: 250 },
  { field: "title", headerName: "JOB TITLE", width: 250 },
  { field: "department", headerName: "JOB CATEGORY", width: 250 },
  { field: "location", headerName: "LOCATION", width: 250 },
  { field: "position_type", headerName: "JOB TYPE", width: 200 },
];

export default function FindJobs({ theme, role }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("https://refeasy.pythonanywhere.com/api/jobs/")
      .then((data) => data.json())
      .then((data) => setRows(data.results));
  }, []);

  const routeName = "/find-jobs";
  let navigate = useNavigate();

  const selectJob = (params) => {
    console.log(params.row);
    navigate(`/job/${params.row.slug}`);
  };

  return (
    <>
      <Navbar theme={theme} routeName={routeName} role={role} />
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            marginBottom: theme.spacing(2),
          }}
        >
          <Typography variant="h3" gutterBottom component="div">
            FIND JOBS
          </Typography>
        </Box>
      </Container>
      <Box sx={{ marginLeft: 15, marginRight: 15 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[5]}
          onRowClick={selectJob}
        />
      </Box>
    </>
  );
}

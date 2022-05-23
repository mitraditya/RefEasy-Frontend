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
  {
    field: "id",
    headerName: "APPLICATION ID",
    width: 300,
  },
  {
    field: "applicant",
    headerName: "APPLICANT EMAIL",
    width: 300,
    valueGetter: (params) => {
      return params.value.email;
    },
  },
  {
    field: "job",
    headerName: "JOB ID",
    width: 250,
    valueGetter: (params) => {
      return params.value.slug;
    },
  },
  {
    field: "ref_emp",
    headerName: "REFERRED BY",
    width: 300,
    valueGetter: (params) => {
      return params.value.email;
    },
  },
  { field: "status", headerName: "STATUS", width: 300 },
];

export default function ApplicationsList({ theme, role }) {
  const [rows, setRows] = useState([]);

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
        setRows(data.results);
      });
  }, []);

  const routeName = "/admin";
  let navigate = useNavigate();

  const selectApplication = (params) => {
    console.log(params.row);
    navigate(`/admin/application/${params.row.id}`);
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
            FIND APPLICATIONS
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
          onRowClick={selectApplication}
        />
      </Box>
    </>
  );
}

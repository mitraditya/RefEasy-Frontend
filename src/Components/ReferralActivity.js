import {
  Card,
  CssBaseline,
  Container,
  Typography,
  Box,
  Grid,
  CardHeader,
} from "@mui/material";
import React from "react";
import { getMyReferrals } from "../Services/ApiService";
import Navbar from "./Navbar";

const statuses = {
  L01: "Level-1",
  L02: "Level-2",
  L03: "Level-3",
  L04: "Level-4",
  L05: "Level-5",
  ACC: "Accepted",
  REJ: "Rejected"
}

export default function ReferralActivity({ theme, role }) {
  const routeName = "/referral-activity";
  const [myReferrals, setMyReferrals] = React.useState([]);

  React.useEffect(() => {
    async function getMyReferrals1() {
      try {
        const response = await getMyReferrals();
        console.log(response.data);
        setMyReferrals(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMyReferrals1();
  }, []);

  return (
    <>
      <Navbar theme={theme} routeName={routeName} role={role} />
      <Container component="main">
        <CssBaseline />
        {role !== "APP" && (
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
              <Typography
                variant="h4"
                color="primary.main"
                sx={{ fontSize: 25 }}
              >
                REFERRAL ACTIVITY
              </Typography>
            </Box>
            <Box
              sx={{ flex: 1, display: "flex", justifyContent: "space-around" }}
            >
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
                  TOTAL REFERRALS
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
        )}
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
        {/* <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: theme.spacing(2),
          }}
        > */}
        <Grid container spacing={5}>
          {myReferrals && myReferrals.length !== 0 ? (
            myReferrals.map((myRef) => (
              <Grid key={myRef.id} item xs={12} md={4} lg={3}>
                <Card
                  sx={{
                    borderRadius: 5,
                    marginBottom: 7,
                  }}
                >
                  <CardHeader title="Job Title" subheader={myRef.job.title} />
                  <CardHeader
                    title={
                      role === "APP" ? "Referred By" : "Applicant Referred"
                    }
                    subheader={
                      role === "APP"
                        ? myRef.ref_emp.user.first_name
                        : myRef.applicant.user.first_name
                    }
                  />
                  <CardHeader title="Status" subheader={statuses[myRef.status]} />
                  {/* <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      This impressive paella is a perfect party dish and a fun
                      meal to cook together with your guests. Add 1 cup of
                      frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent> */}
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1">
                There are no referrals to display
              </Typography>
            </Grid>
          )}
        </Grid>
        {/* </Box> */}
      </Container>
    </>
  );
}

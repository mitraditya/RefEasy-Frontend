import "./App.css";
import logo from "./TI-logo.png";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import Refer from "./Components/Refer";
import {
  Link as MaterialLink,
  Box,
  Grid,
  Typography,
  Button,
  Toolbar,
} from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
  Link as RouterLink,
  useLocation,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import ReferralActivity from "./Components/ReferralActivity";
import React from "react";
import { getUserDetails, logout } from "./Services/ApiService";
import Navbar from "./Components/Navbar";
import FindJobs from "./Components/FindJobs";
import Job from "./Components/Job";
import ApplicationsList from "./Components/ApplicationsList";
import Application from "./Components/Application";
import ApplyForm from "./Components/ApplyForm";

const theme = createTheme({
  palette: {
    primary: {
      main: red[900],
    },
    secondary: {
      main: "#000000",
    },
  },
});

function RequireAuth({ children }) {
  let location = useLocation();
  const isLoggedIn = localStorage.getItem("access-token");

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// function RequireRole({ children }) {
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";
//   const [userDetails, setUserDetails] = React.useState(null);
//   React.useEffect(() => {
//     async function getUserDetails1() {
//       try {
//         const response = await getUserDetails();
//         console.log(response.data);
//         setUserDetails(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     getUserDetails1();
//   }, []);

//   if(userDetails){
//     if(userDetails.role === "APP"){
//       return <Navigate to={from} />
//     }
//   }

// }

function App() {
  // Only gets executed once, so doesn't update on redirect to login/register.
  // LocalStorage could be used to store user data to solve this issue

  const [userDetails, setUserDetails] = React.useState(null);

  function onLogout() {
    logout();
    setUserDetails(null);
  }

  React.useEffect(() => {
    async function getUserDetails1() {
      try {
        const response = await getUserDetails();
        console.log(response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (localStorage.getItem("access-token")) getUserDetails1();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Box sx={{ flexGrow: 1 }}>
            <Toolbar>
              <Box
                component="img"
                src={logo}
                maxWidth={{ xs: 160 }}
                maxHeight={{ xs: 90 }}
                sx={{ mr: 2 }}
              />
              <MaterialLink
                component={RouterLink}
                to="/"
                sx={{
                  // marginBottom: -5,
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  RefEasy
                </Typography>
              </MaterialLink>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {userDetails && (
                  <Grid item>
                    <Typography
                      sx={{ display: "inline-block", marginRight: 2 }}
                    >
                      Welcome, {userDetails.user.first_name}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={onLogout}
                      sc={{ display: "inline-block" }}
                    >
                      Logout
                    </Button>
                  </Grid>
                )}
              </Box>
            </Toolbar>
          </Box>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  {userDetails && (
                    <Home theme={theme} role={userDetails.role} />
                  )}
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* {userDetails && userDetails.role !== "APP" ? ( */}
            <Route
              path="/referral-activity"
              element={
                <RequireAuth>
                  {userDetails && (
                    <ReferralActivity theme={theme} role={userDetails.role} />
                  )}
                </RequireAuth>
              }
            />
            {/* ) : (
              <></>
            )} */}
            <Route
              path="/referral-policy"
              element={
                <RequireAuth>
                  {userDetails && (
                    <>
                      <Navbar
                        theme={theme}
                        routeName={"/referral-policy"}
                        role={userDetails.role}
                      />
                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: theme.spacing(2),
                        }}
                      >
                        <Typography variant="h3" gutterBottom component="div">
                          HR will update Referral Policy Here.
                        </Typography>
                      </Box>
                    </>
                  )}
                </RequireAuth>
              }
            />
            <Route
              path="/find-jobs"
              element={
                <RequireAuth>
                  {userDetails && (
                    <FindJobs theme={theme} role={userDetails.role} />
                  )}
                </RequireAuth>
              }
            />
            <Route
              path="/job/:id"
              element={
                <RequireAuth>
                  {userDetails && <Job theme={theme} role={userDetails.role} />}
                </RequireAuth>
              }
            />
            <Route
              path="/refer/apply/:id/:refEmp"
              element={
                <RequireAuth>
                  <Refer />
                </RequireAuth>
              }
            />
            <Route
              path="/job/:id/apply/"
              element={
                <RequireAuth>
                  <ApplyForm />
                </RequireAuth>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  {userDetails && (
                    <ApplicationsList theme={theme} role={userDetails.role} />
                  )}
                </RequireAuth>
              }
            />
            <Route
              path="/admin/application/:id"
              element={
                <RequireAuth>
                  {userDetails && (
                    <Application theme={theme} role={userDetails.role} />
                  )}
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

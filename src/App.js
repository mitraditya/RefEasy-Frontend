import "./App.css";
import logo from "./TI-logo.png";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import {
  Link as MaterialLink,
  Box,
  Grid,
  Typography,
  Button,
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
          <Grid container alignItems="center">
            <Grid item>
              <Box
                component="img"
                src={logo}
                maxWidth={{ xs: 160 }}
                maxHeight={{ xs: 90 }}
              />
            </Grid>
            <Box width={20} />
            <Grid item>
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
            </Grid>
            <Box width={20} />
            {userDetails && (
              <Grid item>
                <Typography>Welcome, {userDetails.user.first_name}</Typography>
                <Box width={20} />
                <Button variant="contained" onClick={onLogout}>
                  Logout
                </Button>
              </Grid>
            )}
          </Grid>
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
                  <Navbar theme={theme} routeName={"/referral-policy"} />
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
                </RequireAuth>
              }
            />
            <Route
              path="/find-jobs"
              element={
                <RequireAuth>
                  <FindJobs theme={theme} />
                </RequireAuth>
              }
            />
            <Route
              path="/job/:id"
              element={
                <RequireAuth>
                  <Job theme={theme} />
                </RequireAuth>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <ApplicationsList theme={theme} />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/application/:id"
              element={
                <RequireAuth>
                  <Application theme={theme} />
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

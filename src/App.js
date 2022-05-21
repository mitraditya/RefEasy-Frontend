import "./App.css";
import logo from "./TI-logo.png";
import Login from "./Components/Login";
import Register from "./Components/Register";
import {
  Container,
  Link as MaterialLink,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import Navbar from "./Components/Navbar";
import ReferraActivity from "./Components/ReferralActivity";

const theme = createTheme({
  palette: {
    primary: {
      main: red[900],
    },
  },
});

function App() {
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
          </Grid>
          <Navbar theme={theme} />
          <Routes>
            <Route
              path="/"
              element={
                <Container maxWidth="sm">
                  <div>
                    Welcome to the Home Page! Visit the Login or Register page
                    by clicking on the links below.
                  </div>
                  <Grid container sx={{ mt: 2 }}>
                    <Grid item xs>
                      <MaterialLink component={RouterLink} to="/login">
                        Login
                      </MaterialLink>
                    </Grid>
                    <Grid item xs>
                      <MaterialLink component={RouterLink} to="/register">
                        Register
                      </MaterialLink>
                    </Grid>
                  </Grid>
                </Container>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/referral-activity"
              element={<ReferraActivity theme={theme} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

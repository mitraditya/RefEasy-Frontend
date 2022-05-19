import "./App.css";
import logo from "./TI-logo.png";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Container, Link, Box, CssBaseline, Grid } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: red[700],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Box
          component="img"
          src={logo}
          maxWidth={{ xs: 160 }}
          maxHeight={{ xs: 90 }}
        />
        <BrowserRouter>
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
                      <Link href="/login">Login</Link>
                    </Grid>
                    <Grid item xs>
                      <Link href="/register">Register</Link>
                    </Grid>
                  </Grid>
                </Container>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

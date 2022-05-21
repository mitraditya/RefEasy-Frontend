import { Container, Grid, Link as MaterialLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home({ theme }) {
  const routeName = "/";

  return (
    <>
      <Navbar theme={theme} routeName={routeName} />
      <Container maxWidth="sm">
        <div>
          Welcome to the Home Page! Visit the Login or Register page by clicking
          on the links below.
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
    </>
  );
}

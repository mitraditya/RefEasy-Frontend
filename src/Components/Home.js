import { Container } from "@mui/material";
import Navbar from "./Navbar";

export default function Home({ theme }) {
  const routeName = "/";

  return (
    <>
      <Navbar theme={theme} routeName={routeName} />
      <Container maxWidth="sm">
        <div>Welcome to the Home Page!</div>
        {/* <Grid container sx={{ mt: 2 }}>
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
        </Grid> */}
      </Container>
    </>
  );
}

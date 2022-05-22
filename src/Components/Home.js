import { Container, Box, Typography } from "@mui/material";
import Navbar from "./Navbar";
import img from "../company.jpg";

export default function Home({ theme, role }) {
  const routeName = "/";

  return (
    <>
      <Navbar theme={theme} routeName={routeName} role={role} />
      <Container>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            marginBottom: theme.spacing(1),
          }}
        >
          <Box
            component="img"
            src={img}
            maxWidth={{ xs: 900 }}
            maxHeight={{ xs: 600 }}
          />
          <Typography variant="h4" fontWeight="bold">
            Welcome to the Home Page!
          </Typography>
        </Box>
      </Container>
    </>
  );
}

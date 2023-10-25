import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const pages = ["Form Details", "Form", "Upload Documents"];

function Navbar() {
  const navigate = useNavigate();
  const handleClick = (page) => {
    switch (page) {
      case "Form Details":
        navigate("/");
        break;
      case "Form":
        navigate("/form");
        break;
      case "Upload Documents":
        navigate("/fileupload");
        break;
    }
  };

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleClick(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Link,
  Tooltip,
  Avatar,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
} from "@mui/icons-material";
import Grid2 from "@mui/material/Grid2";

const lightColor = "rgba(8, 22, 39, 1)";

export function Header(props) {
  const { onDrawerToggle } = props;

  return (
    <>
      {/* First AppBar */}
      <AppBar color="info" position="sticky" elevation={0}>
        <Toolbar>
          <Grid2 container spacing={1} sx={{ alignItems: "center" }}>
            {/* Drawer toggle button (only shown on mobile) */}
            <Grid2 sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid2>

            {/* Link to docs */}
            <Grid2
              sx={{ flexGrow: 1, textAlign: { xs: "center", sm: "left" } }}
            >
              <Link
                href="/"
                variant="body2"
                sx={{
                  textDecoration: "none",
                  color: lightColor,
                  "&:hover": {
                    color: "common.white",
                  },
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                Go to docs
              </Link>
            </Grid2>

            {/* Notifications */}
            <Grid2>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid2>
            <Button
              sx={{ borderColor: lightColor }}
              variant="outlined"
              color="inherit"
              size="small"
            >
              Login
            </Button>
            {/* Avatar */}
            <Grid2>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar />
              </IconButton>
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>

      {/* Second AppBar (title and buttons) */}
      <AppBar
        component="div"
        color="info"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid2 container spacing={1} sx={{ alignItems: "center" }}>
            {/* Title */}
            <Grid2 sx={{ flexGrow: 1 }}>
              <Typography
                color="inherit"
                variant="h5"
                component="h1"
                sx={{ textAlign: { xs: "center", sm: "left" } }}
              >
                ViewsEvent
              </Typography>
            </Grid2>
            {/* Help Icon */}
            <Grid2>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>

      {/* Third AppBar (Tabs) */}
      <AppBar
        component="div"
        color="info"
        position="static"
        elevation={0}
        sx={{ zIndex: 0, padding: 1 }}
      >
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Filtro1</Button>
          <Button variant="contained">Filtro2</Button>
          <Button variant="contained">Filtro3</Button>
        </Stack>
      </AppBar>
    </>
  );
}

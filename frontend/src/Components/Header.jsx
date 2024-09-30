import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Avatar,
  Button,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon, Notifications, Help } from "@mui/icons-material";
import Grid2 from "@mui/material/Grid2";

// New color and design improvements
const headerBgColor = "#11212D";
const lightColor = "rgba(255, 255, 255, 0.7)";

export function Header(props) {
  const { onDrawerToggle } = props;

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: headerBgColor }}>
      <Toolbar sx={{ minHeight: 64 }}>
        <Grid2 container spacing={1} alignItems="center">
          {/* Drawer Toggle for Mobile */}
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

          {/* App Title */}
          <Grid2 sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              component="h1"
              color="inherit"
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              ViewsEvent
            </Typography>
          </Grid2>

          {/* Help & Notifications */}
          <Grid2 container spacing={1} alignItems="center">
            <Grid2>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <Help sx={{ color: lightColor }} />
                </IconButton>
              </Tooltip>
            </Grid2>
            <Grid2>
              <Tooltip title="Notifications">
                <IconButton color="inherit">
                  <Notifications sx={{ color: lightColor }} />
                </IconButton>
              </Tooltip>
            </Grid2>
          </Grid2>

          {/* Login Button */}
          <Button
            sx={{
              borderColor: lightColor,
              color: lightColor,
              ml: 2,
              borderWidth: 2,
            }}
            variant="outlined"
            size="small"
          >
            Logout
          </Button>

          {/* User Avatar */}
          <IconButton color="inherit" sx={{ p: 0.5, ml: 2 }}>
            <Avatar />
          </IconButton>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
}

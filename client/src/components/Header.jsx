import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Avatar,
  Button,
  Typography,
  Input,
} from "@mui/material";
import { Menu as MenuIcon, Notifications, Help } from "@mui/icons-material";
import Grid2 from "@mui/material/Grid2";
import Swal from "sweetalert2";

// New color and design improvements
const headerBgColor = "#11212D";
const lightColor = "rgba(255, 255, 255, 0.7)";

export function Header(props) {
  const {
    onDrawerToggle,
    user,
    profilePicture,
    setProfilePicture,
    handleLogout,
    handleProfilePictureUpload,
  } = props;

  // Profile picture change handler
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      const imageUrl = URL.createObjectURL(file);
      // Assuming you have user data available to update
      user.profilePicture = imageUrl; // Update user profile picture preview
    }
  };

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

          {/* File Input for Profile Picture */}
          <Grid2>
            <Input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              sx={{ display: "none" }} // Hide the default input
              id="profile-picture-input"
            />
            <label htmlFor="profile-picture-input">
              <Button
                component="span"
                sx={{ borderColor: lightColor, color: lightColor, ml: 2 }}
                variant="outlined"
                size="small"
              >
                Change Profile Picture
              </Button>
            </label>
          </Grid2>

          {/* Upload Profile Picture Button */}
          <Button
            sx={{ borderColor: lightColor, color: lightColor, ml: 2 }}
            variant="outlined"
            size="small"
            onClick={handleProfilePictureUpload}
            disabled={!profilePicture} // Disable if no picture is selected
          >
            Upload
          </Button>

          {/* User Avatar */}
          <IconButton color="inherit" sx={{ p: 0.5, ml: 2 }}>
            <Avatar src={user?.profilePicture} alt="Profile Picture" />
          </IconButton>

          {/* Logout Button */}
          <Button
            sx={{
              borderColor: lightColor,
              color: lightColor,
              ml: 2,
              borderWidth: 2,
            }}
            variant="outlined"
            size="small"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
}

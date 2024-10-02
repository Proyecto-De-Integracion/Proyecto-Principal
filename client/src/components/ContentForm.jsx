import React, { useState } from "react";
import {
  AppBar,
  Paper,
  Grid,
  Tabs,
  Tab,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

export function Content2() {
  const [activeTab, setActiveTab] = useState(0);

  // Updated form data to match the controller's structure
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lat: "",
    long: "",
    category: "",
    startDate: "",
    endDate: "",
    media: null, // Media for photos and videos
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // Handle file input for media
      setFormData({
        ...formData,
        [name]: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = new FormData();
    eventData.append("title", formData.title);
    eventData.append("description", formData.description);
    eventData.append("lat", formData.lat);
    eventData.append("long", formData.long);
    eventData.append("category", formData.category);
    eventData.append("startDate", formData.startDate);
    eventData.append("endDate", formData.endDate);

    // Append media files
    if (formData.media) {
      for (let i = 0; i < formData.media.length; i++) {
        eventData.append("media", formData.media[i]);
      }
    }

    try {
      const response = await fetch("http://localhost:4000/publications", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: eventData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Publication created:", result);
      } else {
        console.error("Error:", result);
      }
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Tabs value={activeTab} onChange={handleTabChange} textColor="inherit">
          <Tab label="Form" />
        </Tabs>
      </AppBar>

      <Grid container spacing={2} sx={{ p: 3 }}>
        {activeTab === 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Crear Nuevo Evento
            </Typography>

            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
              onSubmit={handleSubmit}
            >
              <TextField
                required
                label="Title"
                variant="outlined"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
              />

              <TextField
                required
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />

              <TextField
                required
                label="Latitude"
                variant="outlined"
                fullWidth
                name="lat"
                value={formData.lat}
                onChange={handleChange}
              />

              <TextField
                required
                label="Longitude"
                variant="outlined"
                fullWidth
                name="long"
                value={formData.long}
                onChange={handleChange}
              />

              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                helperText="Enter event category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />

              <TextField
                required
                label="Start Date"
                variant="outlined"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />

              <TextField
                required
                label="End Date"
                variant="outlined"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />

              <input
                type="file"
                name="media"
                multiple
                accept="image/*, video/*"
                onChange={handleChange}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}

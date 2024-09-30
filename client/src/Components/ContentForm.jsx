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
import axios from "axios";
export function Content2() {
  const [activeTab, setActiveTab] = useState(0);

  // Ensure all fields are initialized with an empty string
  const [formData, setFormData] = useState({
    titles: "",
    descriptions: "",
    locations: "",
    categorys: "",
    startDates: "",
    endDates: "",
    media: null, // For media files like images or videos
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handle file input separately
    if (files) {
      setFormData({
        ...formData,
        [name]: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value || "", // Ensure non-file inputs always have a string value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData object for submission
    const eventData = new FormData();
    eventData.append("titles", formData.titles);
    eventData.append("descriptions", formData.descriptions);
    eventData.append("locations", formData.locations);
    eventData.append("categorys", formData.categorys);
    eventData.append("startDates", formData.startDates);
    eventData.append("endDates", formData.endDates);

    // Handle media files
    if (formData.media) {
      for (let i = 0; i < formData.media.length; i++) {
        eventData.append("media", formData.media[i]);
      }
    }

    try {
      const response = await fetch("http://localhost:5000/publications", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
                name="titles" // Match with formData key
                value={formData.titles}
                onChange={handleChange}
              />

              <TextField
                required
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                name="descriptions" // Match with formData key
                value={formData.descriptions}
                onChange={handleChange}
              />

              <TextField
                required
                label="Location"
                variant="outlined"
                fullWidth
                name="locations" // Match with formData key
                value={formData.locations}
                onChange={handleChange}
              />

              <TextField
                label="Tags"
                variant="outlined"
                fullWidth
                helperText="Separate tags with commas"
                name="categorys" // Match with formData key
                value={formData.categorys}
                onChange={handleChange}
              />

              {/* Media Input */}
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

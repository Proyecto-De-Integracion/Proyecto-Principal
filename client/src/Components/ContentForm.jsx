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
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    tags: "",
    media: null, // For media files like images or videos
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      // For file input like media
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

    // Create form data to send via POST request
    const eventData = new FormData();
    eventData.append("title", formData.title);
    eventData.append("description", formData.description);
    eventData.append("location", formData.location);
    eventData.append("tags", formData.tags);
    if (formData.media) {
      for (let i = 0; i < formData.media.length; i++) {
        eventData.append("media", formData.media[i]);
      }
    }

    try {
      // Send data to backend
      const response = await axios.post("", eventData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data); // Handle response (e.g., show success message)
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

            {/* Event Form */}
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
                label="Location"
                variant="outlined"
                fullWidth
                name="location"
                value={formData.location}
                onChange={handleChange}
              />

              <TextField
                label="Tags"
                variant="outlined"
                fullWidth
                helperText="Separate tags with commas"
                name="tags"
                value={formData.tags}
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

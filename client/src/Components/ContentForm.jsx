import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Map from "./Map"; // Assuming you have a Map component

export const Content2 = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [lat, setLat] = useState(""); // State for latitude
  const [lng, setLng] = useState(""); // State for longitude
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lat: "", // Latitude for location
    long: "", // Longitude for location
    category: "", // Event category
    startDate: "", // Event start date
    endDate: "", // Event end date
    media: null, // Media files (image/video)
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMarkerChange = (newLat, newLng) => {
    setLat(newLat);
    setLng(newLng);

    setFormData((prevFormData) => ({
      ...prevFormData,
      lat: newLat,
      long: newLng,
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({
        ...formData,
        [name]: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value || "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = new FormData();
    eventData.append("title", formData.title);
    eventData.append("description", formData.description);
    eventData.append(
      "location",
      JSON.stringify({ lat: formData.lat, long: formData.long })
    );
    eventData.append("category", formData.category);
    eventData.append("startDate", formData.startDate);
    eventData.append("endDate", formData.endDate);

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
        body: eventData,
        credentials: "include",
      });
      const result = await response.json();

      if (response.ok) {
        console.log("Publication created successfully:", result);
      } else {
        console.error("Error creating publication:", result);
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
          <Tab label="Create Publication" />
        </Tabs>
      </AppBar>

      <Grid container spacing={2} sx={{ p: 3 }}>
        {activeTab === 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Create New Publication
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

              {/* Map Component */}
              <Box sx={{ height: 250, mt: 2 }}>
                <Map onMarkerChange={handleMarkerChange} />
              </Box>

              {/* Address and Coordinates */}
              <TextField
                required
                label="Latitude"
                variant="outlined"
                fullWidth
                name="lat"
                value={formData.lat || lat}
                onChange={handleChange}
                InputProps={{ readOnly: true }} // ReadOnly as it is updated by map interaction
              />

              <TextField
                required
                label="Longitude"
                variant="outlined"
                fullWidth
                name="long"
                value={formData.long || lng}
                onChange={handleChange}
                InputProps={{ readOnly: true }} // ReadOnly as it is updated by map interaction
              />

              <TextField
                required
                label="Category"
                variant="outlined"
                fullWidth
                name="category"
                value={formData.category}
                onChange={handleChange}
              />

              <TextField
                required
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />

              <TextField
                required
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />

              {/* Media Input */}
              <input
                type="file"
                name="media"
                multiple
                accept="image/*,video/*"
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
};

export default Content2;

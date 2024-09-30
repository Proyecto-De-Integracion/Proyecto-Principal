import React, { useState, useEffect } from "react";
import {
  AppBar,
  Card,
  CardMedia,
  CardContent,
  Paper,
  Grid,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Map } from "./Map.jsx";

export function Content() {
  const [activeTab, setActiveTab] = useState(0);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    location: "",
    imageUrl: "",
  });
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get("");
        const data = response.data;
        setEventData({
          title: data.title,
          description: data.description,
          dateStart: data.dateStart,
          dateEnd: data.dateEnd,
          location: data.location,
          imageUrl: data.imageUrl || "https://via.placeholder.com/800x400",
        });
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, []);
  return (
    <Paper sx={{ maxWidth: 1300, margin: "", overflow: "hidden" }}>
      {/* AppBar with Tabs */}
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Tabs value={activeTab} onChange={handleTabChange} textColor="inherit">
          <Tab label="Acerca" />
          <Tab label="Mapa" />
        </Tabs>
      </AppBar>

      {/* Main Grid Container */}
      <Grid container spacing={2} sx={{ p: 3 }}>
        {activeTab === 0 && (
          <>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
            >
              {/* Placeholder for Photo */}
              <Card sx={{ maxHeight: 400 }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={eventData.imageUrl}
                  alt="Event placeholder"
                />
              </Card>
            </Grid>

            {/* Display Event Information */}
            <Grid item xs={12}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {eventData.title || "Título del Evento"}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Descripción:</strong>{" "}
                  {eventData.description ||
                    "Descripción del evento no disponible."}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Fecha de Inicio:</strong>{" "}
                  {eventData.dateStart || "Fecha de inicio no disponible"}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <strong>Fecha de Fin:</strong>{" "}
                  {eventData.dateEnd || "Fecha de fin no disponible"}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                    <DemoItem>
                      <DateCalendar
                        defaultValue={dayjs("27/9/2024")}
                        disabled
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
                <Typography variant="body1" gutterBottom>
                  <strong>Ubicación:</strong>{" "}
                  {eventData.location || "Ubicación no disponible"}
                </Typography>
              </CardContent>
            </Grid>
          </>
        )}

        {activeTab === 1 && (
          <Grid item xs={12}>
            <Map />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}

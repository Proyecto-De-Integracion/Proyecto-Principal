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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Map } from "./Map.jsx";

export function Content() {
  const [activeTab, setActiveTab] = useState(0);
  const [events, setEvents] = useState([]); // Array of events

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/publications");
        const data = response.data;
        setEvents(data);
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
            {events.map((event, index) => (
              <Grid key={index} item xs={12}>
                {/* Create a Paper for each event */}
                <Paper sx={{ p: 3, mb: 3 }}>
                  {/* Event Media */}
                  <Grid item xs={12} container justifyContent="center">
                    <Card sx={{ maxHeight: 400 }}>
                      <CardMedia
                        component="img"
                        height="400"
                        image={
                          event.imageUrl ||
                          "https://via.placeholder.com/800x400"
                        } // Ensure this is a string
                        alt="Event image"
                      />
                    </Card>
                  </Grid>

                  {/* Display Event Information */}
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {event.titles || "Título del Evento"}
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                      <strong>Descripción:</strong>{" "}
                      {event.descriptions ||
                        "Descripción del evento no disponible."}
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                      <strong>Fecha de Inicio:</strong>{" "}
                      {event.startDates || "Fecha de inicio no disponible"}
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                      <strong>Fecha de Fin:</strong>{" "}
                      {event.endDates || "Fecha de fin no disponible"}
                    </Typography>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        defaultValue={dayjs(event.startDates)}
                        disabled
                      />
                    </LocalizationProvider>

                    <Typography variant="body1" gutterBottom>
                      <strong>Ubicación:</strong>{" "}
                      {`${event.locations.lat}, ${event.locations.long}` ||
                        "Ubicación no disponible"}
                    </Typography>
                  </CardContent>
                </Paper>
              </Grid>
            ))}
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

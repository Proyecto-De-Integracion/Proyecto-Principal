import { useState, useEffect } from "react";
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
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Map } from "./Map.jsx";
import { fetchPublicationById } from "../api/publish.js"; // Asegúrate de que la ruta sea correcta

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
        // Supongamos que estás buscando por ID, puedes cambiar esto según sea necesario
        const publicationId = "ID_DE_LA_PUBLICACION"; // Reemplaza esto con el ID real
        const data = await fetchPublicationById(publicationId);

        setEventData({
          title: data.titles,
          description: data.descriptions,
          dateStart: data.startDates,
          dateEnd: data.endDates,
          location: `${data.locations.lat}, ${data.locations.long}`,
          imageUrl:
            data.medias.photos[0]?.url || "https://via.placeholder.com/800x400", // Asegúrate de que existe al menos una foto
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

import { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Grid, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { fetchAllPublications } from "../api/publish.js";

export function Content() {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await fetchAllPublications();
        setEventsData(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Grid container spacing={3} justifyContent="center">
      {eventsData.length === 0 ? (
        <Typography variant="h6" sx={{ p: 3, color: "#fff" }}>
          No hay eventos disponibles en este momento.
        </Typography>
      ) : (
        eventsData.map((event, index) => {
          const startDate = dayjs(event.startDates);
          const endDate = dayjs(event.endDates);

          return (
            <Grid
              item
              xs={12}
              key={index}
              display="flex"
              justifyContent="center"
            >
              {/* Display Event Card */}
              <Card
                sx={{
                  mb: 4,
                  padding: 3,
                  width: 1000, // Ancho de la carta
                  height: "auto",
                  backgroundColor: "#11212D", // Cambiar a tu color deseado
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Sombra suave
                  borderRadius: "16px", // Bordes redondeados
                }}
              >
                {/* Grid for Image + Description and Calendar */}
                <Grid container spacing={2}>
                  {/* Column for Image and Description */}
                  <Grid item xs={8}>
                    {/* Display Event Image */}
                    <CardMedia
                      component="img"
                      image={
                        event.medias?.photos[0]?.url ||
                        "https://via.placeholder.com/800x400" // Cambia a un tamaño más alto
                      }
                      alt="Event"
                      sx={{
                        objectFit: "cover",
                        maxHeight: 300, // Aumenta la altura de la imagen
                        width: "100%",
                        margin: "0 auto", // Centrar imagen
                      }}
                    />

                    <CardContent>
                      {/* Display Event Description */}
                      <Typography
                        variant="body1"
                        sx={{
                          mt: 2,
                          textAlign: "center",
                          fontSize: 16,
                          color: "#fff",
                        }} // Cambiar el color del texto
                      >
                        {event.descriptions ||
                          "Descripción del evento no disponible."}
                      </Typography>
                    </CardContent>
                  </Grid>

                  {/* Column for Calendar */}
                  <Grid item xs={4}>
                    {/* Calendar showing event duration */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        value={startDate}
                        onChange={() => {}} // Para que no sea editable
                        renderDay={(day, _value, DayComponentProps) => {
                          const isInRange = day.isBetween(
                            startDate,
                            endDate,
                            "day",
                            "[]"
                          );
                          return (
                            <div
                              style={{
                                backgroundColor: isInRange
                                  ? "#b2dfdb"
                                  : "transparent",
                                color: "#fff", // Cambiar el color del texto a blanco
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%", // Asegura que el texto esté centrado
                              }}
                            >
                              <span style={{ color: "#fff" }}>
                                {" "}
                                {/* Asegúrate que el texto sea blanco */}
                                {day.format("DD")}
                              </span>
                            </div>
                          );
                        }}
                        disablePast
                        readOnly
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          );
        })
      )}
    </Grid>
  );
}

import { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Paper,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay"; // Verifica que esta línea sea correcta
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { fetchAllPublications } from "../api/publish.js";

dayjs.extend(isBetweenPlugin);

// Custom style for the PickersDay
const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary.light,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.light,
    },
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

const isInRange = (day, start, end) => {
  return day.isBetween(start, end, "day", "[]");
};

function Day(props) {
  const { day, startDate, endDate, hoveredDay, ...other } = props;
  const isSelected = isInRange(day, startDate, endDate);
  const isHovered = isInRange(day, hoveredDay, endDate);

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      isSelected={isSelected}
      isHovered={isHovered}
    />
  );
}

export function Content() {
  const [eventsData, setEventsData] = useState([]);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null); // Stores start and end dates of selected event

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
    <Paper
      sx={{
        maxWidth: 1300,
        margin: "auto",
        overflow: "hidden",
        backgroundColor: "transparent", // Cambia el fondo a transparente
        padding: 3, // Espaciado alrededor del contenido
      }}
    >
      {/* Main Grid Container */}
      <Grid container spacing={2} justifyContent="center">
        {eventsData.length === 0 ? (
          <Typography variant="h6" sx={{ p: 3 }}>
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
                    mb: 2,
                    display: "flex",
                    flexDirection: "row", // Alinea la foto y el calendario en una fila
                    padding: 2,
                    width: 800, // Aumenta el ancho de la publicación
                    height: "auto", // Alto automático
                  }}
                >
                  {/* User's profile photo and name */}
                  <CardContent
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      width: "30%",
                    }}
                  >
                    <Avatar
                      alt="User Profile"
                      src={
                        event.userProfilePhoto ||
                        "https://via.placeholder.com/40"
                      }
                      sx={{ mr: 1 }}
                    />
                    <Typography variant="subtitle1">
                      {event.userName || "Nombre del Usuario"}
                    </Typography>
                  </CardContent>

                  {/* Display Event Image */}
                  <CardMedia
                    component="img"
                    height="140" // Ajuste de altura de la imagen
                    image={
                      event.medias?.photos[0]?.url ||
                      "https://via.placeholder.com/800x400"
                    }
                    alt="Event placeholder"
                    sx={{ objectFit: "cover", maxHeight: 200, width: "40%" }} // Ajusta la imagen para cubrir el área
                  />

                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      width: "30%",
                    }}
                  >
                    {/* Calendar displaying the event dates */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        value={selectedDates || startDate}
                        onChange={() => {}}
                        showDaysOutsideCurrentMonth
                        displayWeekNumber
                        slots={{ day: Day }}
                        slotProps={{
                          day: {
                            startDate,
                            endDate,
                            hoveredDay,
                            onPointerEnter: () => setHoveredDay(startDate),
                            onPointerLeave: () => setHoveredDay(null),
                          },
                        }}
                      />
                    </LocalizationProvider>

                    {/* Display Map */}
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      <strong>Ubicación:</strong>{" "}
                      {event.locations?.lat && event.locations?.long
                        ? `${event.locations.lat}, ${event.locations.long}`
                        : "Ubicación no disponible"}
                    </Typography>

                    {/* Display Event Description */}
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Descripción:</strong>{" "}
                      {event.descriptions ||
                        "Descripción del evento no disponible."}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </Paper>
  );
}

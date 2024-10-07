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
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
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
  const [activeTab, setActiveTab] = useState(0);
  const [eventsData, setEventsData] = useState([]);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null); // Stores start and end dates of selected event

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
    <Paper sx={{ maxWidth: 1300, margin: "", overflow: "hidden" }}>
      {/* AppBar with Title */}
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Eventos
        </Typography>
      </AppBar>

      {/* Main Grid Container */}
      <Grid container spacing={2} sx={{ p: 3 }}>
        {eventsData.length === 0 ? (
          <Typography variant="h6" sx={{ p: 3 }}>
            No hay eventos disponibles en este momento.
          </Typography>
        ) : (
          eventsData.map((event, index) => {
            const startDate = dayjs(event.startDates);
            const endDate = dayjs(event.endDates);

            return (
              <Grid container spacing={2} key={index}>
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  {/* Display Event Image */}
                  <Card sx={{ maxHeight: 400 }}>
                    <CardMedia
                      component="img"
                      height="400"
                      image={
                        event.medias?.photos[0]?.url ||
                        "https://via.placeholder.com/800x400"
                      }
                      alt="Event placeholder"
                    />
                  </Card>
                </Grid>

                {/* Display Event Information */}
                <Grid item xs={12}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {event.titles || "Título del Evento"}
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                      <strong>Descripción:</strong>{" "}
                      {event.descriptions ||
                        "Descripción del evento no disponible."}
                    </Typography>

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

                    <Typography variant="body1" gutterBottom>
                      <strong>Ubicación:</strong>{" "}
                      {event.locations?.lat && event.locations?.long
                        ? `${event.locations.lat}, ${event.locations.long}`
                        : "Ubicación no disponible"}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            );
          })
        )}
      </Grid>
    </Paper>
  );
}

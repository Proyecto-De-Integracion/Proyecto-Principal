import { useState } from "react";
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
import Map from "../Components/Map.jsx"; // Asegúrate de que tienes este componente
import Swal from "sweetalert2"; // Importa SweetAlert2
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la redirección

export const Content2 = () => {
  const navigate = useNavigate(); // Inicializa useNavigate
  const [activeTab, setActiveTab] = useState(0);
  const [lat, setLat] = useState(""); // Estado para latitud
  const [lng, setLng] = useState(""); // Estado para longitud
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lat: "", // Latitud para ubicación
    long: "", // Longitud para ubicación
    category: "", // Categoría del evento
    startDate: "", // Fecha de inicio del evento
    endDate: "", // Fecha de fin del evento
    media: null, // Archivos multimedia (imagen/video)
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMarkerChange = (newLat, newLng) => {
    // Actualiza el estado de latitud y longitud
    console.log(newLat, newLng);
    setLat(newLat);
    setLng(newLng);

    // Actualiza los valores de latitud y longitud en formData
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
        // Muestra la alerta de éxito
        Swal.fire({
          title: "¡Éxito!",
          text: "Tu publicación se publicó correctamente.",
          icon: "success",
          confirmButtonText: "Ver publicaciones",
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirige a la página de publicaciones
            navigate("/home");
          }
        });
      } else {
        console.error("Error creating publication:", result);
        Swal.fire({
          title: "Error",
          text: "No se pudo crear la publicación. Intenta de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error submitting event:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al enviar la publicación.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Paper sx={{ maxWidth: 1200, margin: "auto", overflow: "hidden" }}>
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
          <>
            {/* Formulario a la izquierda */}
            <Grid item xs={12} md={6}>
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

                <TextField
                  required
                  label="Latitude"
                  variant="outlined"
                  fullWidth
                  name="lat"
                  value={lat} // Este valor se actualiza con el marcador del mapa
                  onChange={handleChange}
                  InputProps={{ readOnly: true }} // Solo lectura, actualizado por el mapa
                />

                <TextField
                  required
                  label="Longitude"
                  variant="outlined"
                  fullWidth
                  name="long"
                  value={lng} // Este valor se actualiza con el marcador del mapa
                  onChange={handleChange}
                  InputProps={{ readOnly: true }} // Solo lectura, actualizado por el mapa
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
                  accept="image/,video/"
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

            {/* Mapa a la derecha */}
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 500 }}>
                <Map onMarkerChange={handleMarkerChange} />
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default Content2;

import { useEffect, useState } from "react";
import { updateProfilePicture } from "../api/auth"; // Asume que ya tienes este endpoint
import { fetchAllPublications } from "../api/publish"; // Tu API de publicaciones
import {
  Avatar,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";

export default function Profile() {
  const [profilePicture, setProfilePicture] = useState(null); // URL de la foto de perfil
  const [publications, setPublications] = useState([]);

  // Fetch publicaciones al cargar la página
  useEffect(() => {
    fetchAllPublications()
      .then((data) => setPublications(data))
      .catch((error) => console.error(error));
  }, []);

  // Cambiar foto de perfil (input invisible)
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profilePicture", file);

    updateProfilePicture(formData)
      .then((response) => {
        setProfilePicture(URL.createObjectURL(file)); // Actualiza la vista con la nueva imagen
      })
      .catch((error) => console.error(error));
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {/* Columna centrada: Foto de perfil */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Box textAlign="center">
          <Avatar
            src={profilePicture || "/default-avatar.png"} // Default si no hay foto
            alt="Foto de perfil"
            sx={{ width: 300, height: 300, margin: "auto" }} // Foto más grande
          />
          <Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
            Nombre de usuario
          </Typography>

          {/* Input invisible para cambiar la foto */}
          <input
            hidden
            accept="image/*"
            type="file"
            id="profilePicInput"
            onChange={handleProfilePictureChange}
          />
        </Box>
      </Grid>

      {/* Columna derecha: Publicaciones */}
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom>
          Publicaciones
        </Typography>
        {publications.length > 0 ? (
          publications.map((pub) => (
            <Card key={pub.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{pub.title}</Typography>
                <Typography>{pub.content}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No hay publicaciones.</Typography>
        )}
      </Grid>
    </Grid>
  );
}

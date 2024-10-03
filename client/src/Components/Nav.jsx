import {
  Divider,
  Drawer,
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PublishIcon from "@mui/icons-material/Publish";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getSession, logoutUser, updateProfilePicture } from "../api/auth";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";

// Categorías del menú lateral
const categories = [
  {
    id: "Eventos y Perfil",
    children: [
      { id: "Eventos", icon: <PublicIcon />, route: "/home" },
      { id: "Perfil", icon: <PeopleIcon />, route: "/profile" },
      { id: "Publicar", icon: <PublishIcon />, route: "/publish" },
    ],
  },
  {
    id: "Configuraciones y Rendimiento",
    children: [
      { id: "Configuraciones", icon: <SettingsIcon />, route: "/settings" },
      { id: "Rendimiento", icon: <TimerIcon />, route: "/performance" },
    ],
  },
];

// Estilos para los elementos del menú
const itemStyle = {
  py: 2,
  px: 3,
  color: "rgba(255, 255, 255, 0.8)",
  transition: "background 0.3s ease",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.1)",
  },
};

const itemCategoryStyle = {
  fontSize: "1rem",
  py: 2,
  px: 3,
  textTransform: "uppercase",
  fontWeight: "bold",
  color: "#fff",
  bgcolor: "#2C3E50",
  boxShadow: "0 -1px 0 rgba(255,255,255,0.1) inset",
};

export function Navigator(props) {
  const { ...other } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null); // Referencia para el input de archivo

  useEffect(() => {
    const fetchSession = async () => {
      const res = await getSession();
      if (res.user) {
        setUser(res.user);
        setProfilePicture(res.user.profilePicture.url); // Ajuste para acceder al URL del profilePicture
      }
    };
    fetchSession();
  }, []);

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("media", file); // Cambio de 'profilePicture' a 'media' según el backend

      try {
        const res = await updateProfilePicture(formData);
        if (res.message === "perfil actualizado con éxito") {
          setProfilePicture(res.profilePicture.url); // Ajuste para actualizar el URL de la imagen
          Swal.fire("Éxito", "Foto de perfil actualizada con éxito", "success");
        } else {
          Swal.fire(
            "Error",
            "No se pudo actualizar la foto de perfil",
            "error"
          );
        }
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Error",
          "Hubo un problema al actualizar la foto de perfil",
          "error"
        );
      }
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      console.log(res); // Debugging para ver la respuesta del servidor
      if (res && res.message === "Cierre de sesión exitoso") {
        // Cambiar a "Cierre de sesión exitoso"
        Swal.fire({
          title: "Cierre de sesión",
          text: "Redirigiendo a la página de inicio de sesión...",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.href = "/login"; // Redirige a la página de inicio de sesión
        }, 2000);
      } else {
        // Si la respuesta no es la esperada, muestra un error
        Swal.fire("Error", "No se pudo cerrar sesión", "error");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error); // Muestra el error en la consola
      Swal.fire("Error", "Hubo un problema al cerrar sesión", "error");
    }
  };

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <Drawer variant="permanent" {...other}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between", // Para poner el logout abajo
        }}
      >
        <List disablePadding>
          <Box
            sx={{
              display: "flex", // Use flexbox for centering
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically (if needed)
              mb: 2,
            }}
          >
            <img
              src={logo} // Use the imported logo
              alt="Logo"
              style={{ width: "100px", height: "auto" }}
            />
          </Box>
          {/* Foto de perfil con input para cambiarla */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 1 }}>
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                cursor: "pointer",
              }}
              onClick={() => fileInputRef.current.click()} // Abre el input de archivo al hacer clic en el avatar
            >
              <Avatar src={profilePicture} sx={{ width: 80, height: 80 }} />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              />
            </Box>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleProfilePictureChange}
              style={{ display: "none" }} // Ocultar el input
            />
          </Box>

          {/* Nombre del usuario con recuadro estético */}
          <Box
            sx={{
              textAlign: "center",
              bgcolor: "#11212D",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              p: 1,
              mx: 2,
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {user ? user.usernames : "Invitado"}
            </Typography>
          </Box>

          {/* Iterar sobre las categorías */}
          {categories.map(({ id, children }) => (
            <Box key={id} sx={{ bgcolor: "#11212D" }}>
              {/* Título de la Categoría */}
              <ListItem sx={itemCategoryStyle}>
                <ListItemText sx={{ fontFamily: "Montserrat, sans-serif" }}>
                  {id}
                </ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, route }) => (
                <ListItem disablePadding key={childId}>
                  <ListItemButton
                    selected={location.pathname === route}
                    sx={{
                      ...itemStyle,
                      bgcolor:
                        location.pathname === route
                          ? "rgba(255, 255, 255, 0.1)"
                          : "inherit",
                      borderLeft:
                        location.pathname === route
                          ? "4px solid #FF6F61"
                          : "none",
                    }}
                    onClick={() => handleClick(route)}
                  >
                    <ListItemIcon
                      sx={{
                        color: location.pathname === route ? "#FF6F61" : "#FFF",
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText sx={{ fontFamily: "Montserrat, sans-serif" }}>
                      {childId}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </List>

        {/* Botón de Cerrar Sesión */}
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              bgcolor: "#FF6F61",
              "&:hover": {
                bgcolor: "#E64A19",
              },
              color: "#FFF",
            }}
          >
            Cerrar sesión
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

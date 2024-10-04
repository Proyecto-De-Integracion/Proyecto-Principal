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
import { useEffect, useState } from "react";
import { getSession, logoutUser } from "../api/auth";
import Swal from "sweetalert2";
import logo from "../assets/LOGO 2024.png";

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
  py: 1.5, // Sección más pequeña
  px: 2,
  color: "rgba(255, 255, 255, 0.8)",
  transition: "background 0.3s ease, transform 0.3s ease", // Añadido transform para el hover
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.1)",
    transform: "scale(1.05)", // Aumentar el tamaño al hacer hover
  },
};

const itemCategoryStyle = {
  fontSize: "0.9rem", // Sección más pequeña
  py: 1,
  px: 2,
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "150px", height: "auto" }} // Aumentado el tamaño del logo
            />
          </Box>
          {/* Foto de perfil sin input para cambiarla */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 1 }}>
            <Avatar src={profilePicture} sx={{ width: 80, height: 80 }} />
          </Box>

          {/* Nombre del usuario sin recuadro */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
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

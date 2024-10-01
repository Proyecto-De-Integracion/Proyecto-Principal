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
import LogoutIcon from "@mui/icons-material/Logout"; // Importamos LogoutIcon
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react"; // Asegúrate de importar useRef
import { getSession, logoutUser, updateProfilePicture } from "../api/auth"; // Importamos logoutUser y updateProfilePicture
import Swal from "sweetalert2";

const categories = [
  {
    id: "Eventos y Perfil", // Renombrado
    children: [
      { id: "Eventos", icon: <PublicIcon />, route: "/home" },
      { id: "Perfil", icon: <PeopleIcon />, route: "/profile" },
      { id: "Publicar", icon: <PublishIcon />, route: "/publish" },
    ],
  },
  {
    id: "Configuraciones y Rendimiento", // Renombrado
    children: [
      { id: "Configuraciones", icon: <SettingsIcon />, route: "/settings" },
      { id: "Rendimiento", icon: <TimerIcon />, route: "/performance" },
    ],
  },
];

// Styles
const item = {
  py: 2,
  px: 3,
  color: "rgba(255, 255, 255, 0.8)",
  transition: "background 0.3s ease",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.1)",
  },
};

const itemCategory = {
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
        setProfilePicture(res.user.profilePicture);
      }
    };
    fetchSession();
  }, []);

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const res = await updateProfilePicture(formData);
      if (res.message === "Foto de perfil actualizada con éxito") {
        setProfilePicture(res.profilePicture);
        Swal.fire("Éxito", "Foto de perfil actualizada con éxito", "success");
      } else {
        Swal.fire("Error", "No se pudo actualizar la foto de perfil", "error");
      }
    }
  };

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.message === "Logout successful") {
      Swal.fire({
        title: "Cierre de sesión",
        text: "Redirigiendo a la página de inicio de sesión...",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      Swal.fire("Error", "No se pudo cerrar sesión", "error");
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
          {/* Main Title */}
          <ListItem sx={{ ...item, ...itemCategory, fontSize: 22 }}>
            ViewsEvent
          </ListItem>

          {/* Foto de perfil con input para cambiarla */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 1 }}>
            <Box
              sx={{
                position: "relative", // Para permitir el posicionamiento absoluto del hover
                display: "inline-block",
                cursor: "pointer", // Cambiar el cursor al pasar el mouse
              }}
              onClick={() => fileInputRef.current.click()} // Abre el input de archivo al hacer clic en el avatar
            >
              <Avatar
                src={profilePicture}
                sx={{ width: 80, height: 80 }} // Tamaño reducido
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%", // Asegurar que la superposición sea circular
                  bgcolor: "rgba(255, 255, 255, 0.2)", // Fondo semitransparente
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 1, // Mostrar el fondo al pasar el mouse
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
              border: "1px solid rgba(255, 255, 255, 0.2)", // Borde con transparencia
              p: 1, // Relleno reducido
              mx: 2, // Margen lateral para centrar mejor
              mb: 2, // Margen inferior
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

          {/* Category Loop */}
          {categories.map(({ id, children }) => (
            <Box key={id} sx={{ bgcolor: "#11212D" }}>
              {/* Category Title */}
              <ListItem sx={itemCategory}>
                <ListItemText sx={{ fontFamily: "Montserrat, sans-serif" }}>
                  {id}
                </ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, route }) => (
                <ListItem disablePadding key={childId}>
                  <ListItemButton
                    selected={location.pathname === route}
                    sx={{
                      ...item,
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

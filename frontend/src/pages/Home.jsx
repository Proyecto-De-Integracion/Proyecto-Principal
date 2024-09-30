import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMediaQuery, CssBaseline, Box } from "@mui/material";
import { Content } from "../Components/Content.jsx";
import { Header } from "../Components/Header.jsx";
import { Navigator } from "../Components/Nav.jsx";
import { getSession, logoutUser, updateProfilePicture } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

let theme = createTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

const drawerWidth = 256;

export function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const res = await getSession();
      if (res.user) {
        setUser(res.user);
        setProfilePicture(res.user.profilePicture || null);
      } else {
        navigate("/login");
      }
    };
    fetchSession();
  }, [navigate]);

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
        navigate("/login");
      }, 2000);
    } else {
      Swal.fire("Error", "No se pudo cerrar sesión", "error");
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: imageUrl,
      }));
    }
  };

  const handleProfilePictureUpload = async () => {
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    try {
      const res = await updateProfilePicture(formData);
      if (res.message) {
        Swal.fire("Éxito", "La foto de perfil se ha actualizado", "success");
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: res.profilePicture, // Se usa la URL devuelta por el servidor
        }));
      } else {
        throw new Error("No se pudo actualizar la foto de perfil");
      }
    } catch (error) {
      console.error("Error en la carga de la foto de perfil:", error);
      Swal.fire(
        "Error",
        error.message || "No se pudo actualizar la foto de perfil",
        "error"
      );
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header />
          <Box
            component="main"
            sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            <Content />
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-3xl">
                Bienvenido, {user?.username || "Usuario"}
              </h2>

              {user?.profilePicture && (
                <img
                  src={user.profilePicture}
                  alt="Foto de perfil"
                  className="w-24 h-24 rounded-full mt-4"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="mt-4 border border-gray-300 p-2 rounded"
              />

              <button
                onClick={handleProfilePictureUpload}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                disabled={!profilePicture}
              >
                Cambiar Foto de Perfil
              </button>

              <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              >
                Cerrar sesión
              </button>
            </div>
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}></Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;

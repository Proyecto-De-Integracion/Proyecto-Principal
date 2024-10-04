import {
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Button,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications,
  Help,
  Search as SearchIcon,
} from "@mui/icons-material";
import Grid2 from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { getSession } from "../api/auth";
import logo from "../assets/LOGO 2024.png"; // Importa el logo

const headerBgColor = "#11212D";
const lightColor = "rgba(255, 255, 255, 0.7)";
const buttonHoverColor = "#FF6F61";

export function Header(props) {
  const { onDrawerToggle } = props;

  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      const res = await getSession();
      if (res.user) {
        setUser(res.user);
      }
    };
    fetchSession();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: headerBgColor }}>
      <Toolbar sx={{ minHeight: 64, justifyContent: "space-between" }}>
        <Grid2 container alignItems="center" justifyContent="center">
          <Grid2 sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerToggle}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Grid2>

          {/* Sección del logo */}
          <Grid2 sx={{ flexGrow: 1, textAlign: "center" }}>
            <img src={logo} alt="Logo" style={{ width: "150px" }} />{" "}
            {/* Añade el logo aquí */}
          </Grid2>

          <Grid2
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Grid2>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <Help sx={{ color: lightColor }} />
                </IconButton>
              </Tooltip>
            </Grid2>
            <Grid2>
              <Tooltip title="Notifications">
                <IconButton color="inherit">
                  <Notifications sx={{ color: lightColor }} />
                </IconButton>
              </Tooltip>
            </Grid2>
          </Grid2>

          {/* Campo de búsqueda */}
          <Grid2 sx={{ mx: 2 }}>
            <Box sx={{ position: "relative" }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                  bgcolor: "white",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: buttonHoverColor,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: buttonHoverColor,
                    },
                  },
                }}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: "#999", mr: 1 }} />,
                }}
              />
            </Box>
          </Grid2>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
}

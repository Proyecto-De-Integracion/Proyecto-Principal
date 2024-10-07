import { AppBar, Toolbar, TextField, Box } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getSession } from "../api/auth";

export function Header(props) {
  const { onDrawerToggle } = props;

  const [user, setUser] = useState("");
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
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#11212D" }}>
      {" "}
      {/* Cambia el color de fondo aquí */}
      <Toolbar sx={{ minHeight: 80, justifyContent: "center" }}>
        {" "}
        {/* Aumenta la altura del header */}
        {/* Campo de búsqueda */}
        <Box sx={{ position: "relative", width: "100%", maxWidth: 400 }}>
          {" "}
          {/* Define un ancho máximo para centrar mejor */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              width: "100%", // Asegura que la barra de búsqueda ocupe todo el ancho disponible
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#FF6F61", // Cambia este color según lo desees
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FF6F61", // Cambia este color según lo desees
                },
              },
            }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "#999", mr: 1 }} />,
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Grid2,
  Button,
  TextField,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Map } from "./Map";

export function Content() {
  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Tabs value={0} textColor="inherit">
          <Tab label="Mapa" />
          <Tab label="Acerca" />
        </Tabs>
      </AppBar>
      <Grid2>
        <Map />
      </Grid2>
    </Paper>
  );
}

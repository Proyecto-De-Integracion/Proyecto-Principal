import {
  Divider,
  Drawer,
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PublishIcon from "@mui/icons-material/Publish";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate, useLocation } from "react-router-dom";

// Categories for Navigator
const categories = [
  {
    id: "Field#1",
    children: [
      { id: "Events", icon: <PublicIcon />, route: "/home" },
      { id: "Profile", icon: <PeopleIcon />, route: "/profile" },
      { id: "Publish", icon: <PublishIcon />, route: "/publish" },
    ],
  },
  {
    id: "Field#2",
    children: [
      { id: "Settings", icon: <SettingsIcon />, route: "/settings" },
      { id: "Performance", icon: <TimerIcon />, route: "/performance" },
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
  const location = useLocation(); // Get the current route

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        {/* Main Title */}
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22 }}>
          ViewsEvent
        </ListItem>

        {/* Home Section */}
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon sx={{ color: "#FFF" }} />
          </ListItemIcon>
          <ListItemText sx={{ color: "#FFF" }}>Home</ListItemText>
        </ListItem>

        {/* Category Loop */}
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#11212D" }}>
            {/* Category Title */}
            <ListItem sx={itemCategory}>
              <ListItemText>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, route }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  selected={location.pathname === route} // Check if the current route matches the button's route
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
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

import styles from "./NavBar.module.css";
import { NavLink } from "react-router";
import { Button } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FaceIcon from "@mui/icons-material/Face";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import { UserContext } from "../../provider/UserProvider";

const tabs = [
  { idx: 0, name: "Courses", icon: <MenuBookIcon /> },
  { idx: 1, name: "Teachers", icon: <FaceIcon /> },
  { idx: 2, name: "Leaves", icon: <FlightTakeoffIcon /> },
];

//Main table component
//Component used to render navigation bar that will be present as a header throughout the application
const NavBar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className={styles.navContainer}>
      <div className={styles.tabContainer}>
        {tabs.map((tab) => (
          <Button
            key={tab.idx}
            startIcon={tab.icon}
            component={NavLink}
            to={`/dashboard/${tab.name.toLowerCase()}`}
            size="large"
            sx={{
              backgroundColor: "white",
              color: "#00838f",
              "&.active": {
                // Styles to apply when the NavLink is active
                backgroundColor: "#00838f",
                color: "white",
              },
            }}
          >
            {tab.name}
          </Button>
        ))}
      </div>

      <div className={styles.avatarContainer}>
        <p className={styles.greeting}>
          {user.firstName} {user.lastName}
        </p>
        <Avatar className={styles.avatar} src={user.avatar} sx={{ width: 56, height: 56 }} alt="avatar" />
      </div>
    </nav>
  );
};
export default NavBar;

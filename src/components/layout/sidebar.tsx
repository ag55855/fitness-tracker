import { NavLink } from "react-router-dom";
import styles from "../../styles/sidebar.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

const SideBar = () => {
  return (
<div className={styles.sidebar}>
<NavLink to="/" className={styles.icon} title="Home">
<HomeIcon />
</NavLink>
<NavLink to="/log-workout" className={styles.icon} title="Log Workout">
<DirectionsRunIcon />
</NavLink>
<NavLink to="/profile" className={styles.icon} title="profile">
<AccountCircleIcon />
</NavLink>
<NavLink to="/calendar" className={styles.icon} title="Calendar">
<CalendarMonthIcon />
</NavLink>
<NavLink to="/Settings" className={styles.icon} title="Settings">
<SettingsIcon />
</NavLink>
</div>
 );
};
export default SideBar;

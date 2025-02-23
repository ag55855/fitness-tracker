import styles from "../../styles/navbar.module.scss";
import { AppBar, Toolbar, Typography, InputBase, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const NavBar = () => {
return (
<AppBar position="static" className={styles.navbar}>
<Toolbar className={styles.toolbar}>
<Typography variant="h6" className={styles.logo}>
FITNESS TRACKER
</Typography>
<div className={styles.search}>
<SearchIcon />
<InputBase placeholder="Search" className={styles.input} />
</div>
<Avatar alt="User" src="blob:http://localhost:5173/901520c4-0c6a-4018-bfe5-3eb2ee57a888" />
</Toolbar>
</AppBar>
);
};

export default NavBar;

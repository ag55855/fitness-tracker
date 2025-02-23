import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/layout/Navbar";
import SideBar from "./components/layout/sidebar";
import styles from "./styles/app.module.scss";
import AppRoutes from "./routes/AppRoutes";
const App = () => {
return (
<BrowserRouter>
<div className={styles.appContainer}>
  <SideBar />
 <div className={styles.mainContent}>
 <NavBar />
   {<AppRoutes/>}
 </div>
 </div>
 </BrowserRouter>
 );
};

export default App;





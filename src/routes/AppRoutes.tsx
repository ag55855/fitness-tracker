import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import LogWorkout from "../pages/LogWorkout";
import Calendar from "../pages/Calendar";
import Settings from "../pages/Settings";
import Profile from "../pages/profile";
const AppRoutes = () => {
 return (
<Routes>
<Route path="/" element={<Dashboard />} />
<Route path="/log-workout" element={<LogWorkout />} />
<Route path="/profile" element={<Profile />} />
<Route path="/calendar" element={<Calendar />} />
<Route path="/settings" element={<Settings />} />
</Routes>
 );
};
export default AppRoutes;

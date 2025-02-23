import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateProfile, updateSettings } from "../store/userSlice";
import { useState } from "react";
import {
  Card,
  Typography,
  Switch,
  Button,
  TextField,
  Box,
  FormControlLabel,
  Select,
  MenuItem,
  Avatar,
} from "@mui/material";
import styles from "../styles/settings.module.scss";
const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [editedUser, setEditedUser] = useState(user);
 const handleSave = () => {
dispatch(updateProfile({
name: editedUser.name,
profilePic: editedUser.profilePic,
fitnessGoals: editedUser.fitnessGoals,
}));
dispatch(updateSettings({
darkMode: editedUser.settings.darkMode,
notifications: editedUser.settings.notifications,
language: editedUser.settings.language,
 }));
 };

return (
<div className={styles.settingsContainer}>
<Card className={styles.settingsCard}>
<Typography variant="h5">Settings</Typography>
<Box className={styles.profileSection}>
<Avatar src={editedUser.profilePic} className={styles.avatar} />
<TextField
label="Profile Image URL"
value={editedUser.profilePic}
onChange={(e) => setEditedUser({ ...editedUser, profilePic: e.target.value })}
fullWidth
margin="normal"
 />
</Box>
<div className={styles.section}>
<Typography variant="h6">Account</Typography>
<TextField
label="Full Name"
value={editedUser.name}
onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
fullWidth
margin="normal"
/>
</div>

<div className={styles.section}>
<Typography variant="h6">Fitness Goals</Typography>
<TextField
label="Target Weight"
type="number"
value={editedUser.fitnessGoals.targetWeight}
onChange={(e) => setEditedUser({ ...editedUser, fitnessGoals: { ...editedUser.fitnessGoals, targetWeight: Number(e.target.value) } })}
fullWidth
margin="normal"
/>
</div>
<div className={styles.section}>
<Typography variant="h6">App Preferences</Typography>
<FormControlLabel
control={<Switch checked={editedUser.settings.darkMode} onChange={() => setEditedUser({ ...editedUser, settings: { ...editedUser.settings, darkMode: !editedUser.settings.darkMode } })} />}
label="Dark Mode"
/>
</div>
<div className={styles.section}>
<Typography variant="h6">Language</Typography>
<Select
value={editedUser.settings.language}
onChange={(e) => setEditedUser({ ...editedUser, settings: { ...editedUser.settings, language: e.target.value } })}
fullWidth
>
<MenuItem value="en">English</MenuItem>
<MenuItem value="ar">العربية</MenuItem>
</Select>
</div>
<Button variant="contained" color="primary" onClick={handleSave}>Save Changes</Button>
</Card>
</div>
);
};

export default Settings;
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useState } from "react";
import { updateProfile } from "../store/userSlice";
import {
  Card,
  Avatar,
  Typography,
  Button,
  Modal,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import styles from "../styles/profile.module.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState(true);
  const [editedUser, setEditedUser] = useState(user);
  const handleEdit = () => {
 dispatch(updateProfile(editedUser));
  setOpen(false);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
 if (file) {
const imageUrl = URL.createObjectURL(file);
 dispatch(updateProfile({ profilePic: imageUrl }));
}
};
return (
<div className={styles.profileContainer}>
<Card className={styles.profileCard}>
 <div className={styles.avatarContainer}>
<Avatar src={user.profilePic} className={styles.avatar} />
<input
accept="image/*"
type="file"id="upload-photo"
 hidden
onChange={handleImageChange}
 />
 <label htmlFor="upload-photo">
<IconButton component="span" className={styles.uploadButton}>
 <PhotoCameraIcon />
 </IconButton>
 </label>
</div>
 <Typography variant="h5">{user.name}</Typography>
<Typography variant="body1" color="textSecondary">
  {user.email}
 </Typography>
<div className={styles.stats}>
 <Typography><strong>Total Workouts:</strong> {user.totalWorkouts}</Typography>
   <Typography><strong>Calories Burned:</strong> {user.totalCaloriesBurned} kcal</Typography>
 </div>
<div className={styles.fitnessGoals}>
<Typography variant="h6">Fitness Goals</Typography>
 <Typography>🎯 Target Weight: {user.fitnessGoals.targetWeight} kg</Typography>
<Typography>🏋 Workouts/Week: {user.fitnessGoals.weeklyWorkouts}</Typography>
 <Typography>🔥 Daily Calories: {user.fitnessGoals.dailyCalories} kcal</Typography>
</div>
<Button variant="contained" onClick={() => setOpen(true)} className={styles.editButton}>
Edit Profile</Button>
</Card>
<Modal open={open} onClose={() => setOpen(false)}>
<Box className={styles.modal}>
<Typography variant="h6">Edit Profile</Typography>
<TextField label="Name" value={editedUser.name} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} fullWidth margin="normal" />
<TextField label="Email" value={editedUser.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} fullWidth margin="normal" />
<Button onClick={handleEdit} variant="contained" color="primary">Save Changes</Button>
</Box>
 </Modal>
 </div>
);
};

export default Profile;

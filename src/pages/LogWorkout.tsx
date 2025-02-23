import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWorkout, removeWorkout } from "../store/workoutSlice";
import {
  TextField,
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store/store";
import styles from "../styles/logworkout.module.scss";
const workoutOptions = ["Running", "Cycling", "Yoga", "Weight Lifting", "Swimming", "Jump Rope", "HIIT", "Pilates"];
const LogWorkout = () => {
  const dispatch = useDispatch();
  const workouts = useSelector((state: RootState) => state.workouts.workouts);
  const [form, setForm] = useState({
    type: "",
    duration: "",
    calories: "",
    date: "",
    intensity: "",
    notes: "",
  });

  const [searchQuery, setSearchQuery] = useState(""); 

  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    setForm({ ...form, [e.target.name as string]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
dispatch(
addWorkout({
 id: uuidv4(),
  type: form.type,
 duration: Number(form.duration),
 calories: Number(form.calories),
 date: form.date,
intensity: form.intensity,
  notes: form.notes,
})
);
setForm({ type: "", duration: "", calories: "", date: "", intensity: "", notes: "" });
  };
  const filteredWorkouts = workouts.filter((workout) =>
workout.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
 <Container className={styles.logWorkoutContainer}>
 <Typography variant="h4">Log Your Workout</Typography>
<form onSubmit={handleSubmit} className={styles.form}>
 <FormControl fullWidth margin="normal" required>
   <InputLabel>Workout Type</InputLabel>
 <Select name="type" value={form.type} onChange={handleChange}>
  {workoutOptions.map((option) => (
  <MenuItem key={option} value={option}>
   {option}
  </MenuItem>
  ))}
</Select>
</FormControl>

<TextField label="Duration (min)" name="duration" value={form.duration} onChange={handleChange} fullWidth margin="normal" required type="number" />
<TextField label="Calories Burned" name="calories" value={form.calories} onChange={handleChange} fullWidth margin="normal" required type="number" />
 <TextField label="Date" name="date" value={form.date} onChange={handleChange} fullWidth margin="normal" required type="date" />
 <FormControl fullWidth margin="normal" required>
<InputLabel>Intensity Level</InputLabel>
<Select name="intensity" value={form.intensity} onChange={handleChange}>
<MenuItem value="Low">Low</MenuItem>
<MenuItem value="Medium">Medium</MenuItem>
<MenuItem value="High">High</MenuItem>
</Select>
</FormControl>
<TextField label="Notes (Optional)" name="notes" value={form.notes} onChange={handleChange} fullWidth margin="normal" multiline rows={3} />
<Button type="submit" variant="contained" color="primary">
Save Workout
</Button>
</form>
 <TextField
label="Search Workout"
variant="outlined"
fullWidth
margin="normal"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>

<Typography variant="h5" className={styles.tableTitle}>Workout History</Typography>
<TableContainer component={Paper} className={styles.tableContainer}>
<Table>
<TableHead>
<TableRow>
<TableCell>Type</TableCell>
<TableCell>Duration (min)</TableCell>
<TableCell>Calories</TableCell>
<TableCell>Intensity</TableCell>
<TableCell>Date</TableCell>
<TableCell>Notes</TableCell>
<TableCell>Actions</TableCell>
</TableRow>
</TableHead>
<TableBody>
{filteredWorkouts.length === 0 ? (
<TableRow>
<TableCell colSpan={7} align="center">No matching workouts found.</TableCell>
</TableRow>
) : (
filteredWorkouts.map((workout) => (
<TableRow key={workout.id}>
<TableCell>{workout.type}</TableCell>
<TableCell>{workout.duration}</TableCell>
<TableCell>{workout.calories}</TableCell>
<TableCell>{workout.intensity}</TableCell>
<TableCell>{workout.date}</TableCell>
<TableCell>{workout.notes || "-"}</TableCell>
<TableCell>
<IconButton onClick={() => dispatch(removeWorkout(workout.id))} className={styles.iconButton}>
<DeleteIcon />
</IconButton>
</TableCell>
</TableRow>
))
)}
</TableBody>
</Table>
</TableContainer>
</Container>
 );
};

export default LogWorkout;


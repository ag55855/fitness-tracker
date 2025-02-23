
import styles from "../styles/dashboard.module.scss";
import { Card, Typography, CircularProgress } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TimerIcon from '@mui/icons-material/Timer';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import EventIcon from '@mui/icons-material/Event';
const Dashboard = () => {
const workouts = useSelector((state: RootState) => state.workouts.workouts);
 const totalTime = workouts.reduce((acc, workout) => acc + workout.duration, 0);
const totalCalories = workouts.reduce((acc, workout) => acc + workout.calories, 0);
const totalWorkouts = workouts.length;
const sessionsPerWeek = new Set(
workouts.map((workout) => new Date(workout.date).toISOString().slice(0, 10))
).size;
const data = workouts.length > 0 ? workouts.map((workout, index) => ({
name: `Workout ${index + 1}`,
calories: workout.calories,
duration: workout.duration,
})):[{ name: "No Workouts", calories: 0, duration: 0 }];
  return (
<div className={styles.dashboard}>
<Typography variant="h6" className={styles.title}>Overview</Typography>
<div className={styles.stats}>
<Card className={styles.statCard}>
<TimerIcon className={styles.icon} />
<Typography className={styles.statTitle}>Total Time</Typography>
<CircularProgress variant="determinate" value={totalTime > 1000 ? 100 : (totalTime / 10)} />
<Typography className={styles.statValue}>{totalTime} min</Typography>
</Card>
<Card className={styles.statCard}>
<WhatshotIcon className={styles.icon} />
<Typography className={styles.statTitle}>Total Calories</Typography>
<CircularProgress variant="determinate" value={totalCalories > 5000 ? 100 : (totalCalories / 50)} />
<Typography className={styles.statValue}>{totalCalories} kcal</Typography>
</Card>
<Card className={styles.statCard}>
<FitnessCenterIcon className={styles.icon} />
<Typography className={styles.statTitle}>Total Workouts</Typography>
<CircularProgress variant="determinate" value={totalWorkouts > 50 ? 100 : (totalWorkouts * 2)} />
<Typography className={styles.statValue}>{totalWorkouts}</Typography>
</Card>
<Card className={styles.statCard}>
<EventIcon className={styles.icon} />
<Typography className={styles.statTitle}>Sessions Per Week</Typography>
<CircularProgress variant="determinate" value={sessionsPerWeek > 7 ? 100 : (sessionsPerWeek * 14.3)} />
<Typography className={styles.statValue}>{sessionsPerWeek} sessions</Typography>
</Card>
</div>
<div className={styles.chart}>
<ResponsiveContainer width="100%" height={300}>
<LineChart data={data}>
<CartesianGrid strokeDasharray="3 3" stroke="#E1D5FF" />
<XAxis dataKey="name" stroke="#7C4DFF" />
<YAxis stroke="#7C4DFF"/>
<Tooltip />
<Legend />
<Line type="monotone" dataKey="calories" stroke="#FF6EC7" strokeWidth={2} name="Calories Burned" />
<Line type="monotone" dataKey="duration" stroke="#7C4DFF" strokeWidth={2} name="Duration (min)" />
</LineChart>
</ResponsiveContainer>
</div>
</div>
 );
};
export default Dashboard;




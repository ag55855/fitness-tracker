import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Card, Typography, Modal, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, PickersDay, StaticDatePicker, PickersDayProps } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import styles from "../styles/calendar.module.scss";
const Calendar = () => {
const workouts = useSelector((state: RootState) => state.workouts.workouts);
const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
const [open, setOpen] = useState(false);
const workoutDates = workouts.map(workout => dayjs(workout.date).format("YYYY-MM-DD"));
const isWorkoutDay = (date: Dayjs) => workoutDates.includes(date.format("YYYY-MM-DD"));
const handleDateChange = (date: Dayjs | null) => {
if (date && isWorkoutDay(date)) {
 setSelectedDate(date);
setOpen(true);
 }
};

const CustomPickersDay = (props: PickersDayProps<Dayjs>) => {
const { day, outsideCurrentMonth, ...other } = props;
return (
<PickersDay
 {...other}
day={day}
 outsideCurrentMonth={outsideCurrentMonth}
 className={isWorkoutDay(day) ? styles.workoutDay : ""}
/>
 );
 };

 return (
<div className={styles.calendarContainer}>
<Typography variant="h5" className={styles.title}>Workout Calendar</Typography>
<LocalizationProvider dateAdapter={AdapterDayjs}>
<StaticDatePicker
 displayStaticWrapperAs="desktop"
value={selectedDate}
 onChange={handleDateChange}
  slots={{
 day: CustomPickersDay, 
}}
 />
</LocalizationProvider>
<Modal open={open} onClose={() => setOpen(false)}>
<Box className={styles.modal}>
<Typography variant="h6" className={styles.modalTitle}>
 Workouts on {selectedDate?.format("MMMM D, YYYY")}
</Typography>
{workouts
.filter(workout => dayjs(workout.date).format("YYYY-MM-DD") === selectedDate?.format("YYYY-MM-DD"))
 .map((workout, index) => (
   <Card key={index} className={styles.workoutCard}>
 <Typography variant="body1" className={styles.workoutType}>
 {workout.type} - {workout.duration} min
 </Typography>
 <Typography variant="body2" className={styles.calories}>
  Calories: {workout.calories}
 </Typography>
</Card>
 ))}
{workouts.filter(workout => dayjs(workout.date).format("YYYY-MM-DD") === selectedDate?.format("YYYY-MM-DD")).length === 0 && (
 <Typography variant="body2" className={styles.noWorkout}>
No workouts logged
 </Typography>
)} </Box></Modal>
</div>
);
};

export default Calendar;



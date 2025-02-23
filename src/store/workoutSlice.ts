
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Workout {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
  intensity: string;
  notes?: string;
}
interface WorkoutState {
  workouts: Workout[];
}
const initialState: WorkoutState = {
  workouts: [],
};
const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
 addWorkout: (state, action: PayloadAction<Workout>) => {
  state.workouts.push(action.payload);
  },
 removeWorkout: (state, action: PayloadAction<string>) => {
state.workouts = state.workouts.filter((workout) => workout.id !== action.payload);
},
    clearWorkouts: (state) => {
 state.workouts = [];
 },
 },
});

export const { addWorkout, removeWorkout, clearWorkouts } = workoutSlice.actions;
export default workoutSlice.reducer;


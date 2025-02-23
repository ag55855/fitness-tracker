
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FitnessGoals {
  targetWeight: number;
  weeklyWorkouts: number;
  dailyCalories: number;
}

interface Settings {
  darkMode: boolean;
  notifications: boolean;
  language: string;
}

interface UserState {
  name: string;
  email: string;
  profilePic: string;
  totalWorkouts: number;
  totalCaloriesBurned: number;
  fitnessGoals: FitnessGoals;
  settings: Settings;
}

const initialState: UserState = {
  name: "",
  email: "",
  profilePic: "",
  totalWorkouts: 0,
  totalCaloriesBurned: 0,
  fitnessGoals: {
    targetWeight: 0,
    weeklyWorkouts: 0,
    dailyCalories:0,
  },
  settings: {
    darkMode: true,
    notifications: true,
    language: "en",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
updateProfile: (state, action: PayloadAction<Partial<UserState>>) => {
  return { ...state, ...action.payload };
 },
 updateSettings: (state, action: PayloadAction<Partial<Settings>>) => {
 state.settings = { ...state.settings, ...action.payload };
 },
updateStats: (state, action: PayloadAction<{ totalWorkouts: number; totalCaloriesBurned: number }>) => {
state.totalWorkouts = action.payload.totalWorkouts;
 state.totalCaloriesBurned = action.payload.totalCaloriesBurned;
},
 deleteUser: () => initialState,
},
});

export const { updateProfile, updateSettings, updateStats, deleteUser } = userSlice.actions;
export default userSlice.reducer;




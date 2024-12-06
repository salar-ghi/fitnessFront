export interface Exercise {
    name: string;
    sets: number;
    reps: number;
    completed: boolean;
  }
  
  export interface WorkoutDay {
    date: string;
    exercises: Exercise[];
    completed: boolean;
  }
  
  export interface WorkoutPlan {
    id: string;
    createdAt: string;
    duration: string;
    status: "active" | "completed" | "abandoned";
    targetMuscles: string[];
    schedule: string[];
    goal: string;
    progress: number;
    currentDay: number;
    totalDays: number;
    workoutDays: WorkoutDay[];
  }
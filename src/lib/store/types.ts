export interface HealthCondition {
    subPart: string;
    description: string;
  }
  
  export interface WorkoutSchedule {
    day: string;
    duration: number;
    startTime: string;
  }
  
  export interface UserState {
    currentStep: number;
    gender: "male" | "female" | null;
    age: { month: number; year: number } | null;
    ageRange: string | null;
    height: number | null;
    weight: number | null;
    bodyType: string | null;
    healthConditions: Record<string, HealthCondition>;
    bodyGoals: Record<string, number>;
    desiredPhysique: string | null;
    location: string | null;
    equipment: string[];
    targetMuscles: string[];
    fitnessLevel: string | null;
    targetWeight: number | null;
    planDuration: string | null;
    workoutSchedule: WorkoutSchedule[];
  }
  
  export interface UserActions {
    setGender: (gender: "male" | "female") => void;
    setAge: (age: { month: number; year: number }) => void;
    setAgeRange: (range: string) => void;
    setHeight: (height: number) => void;
    setWeight: (weight: number) => void;
    setBodyType: (type: string) => void;
    setHealthCondition: (partId: string, condition: HealthCondition) => void;
    removeHealthCondition: (partId: string) => void;
    setBodyGoalValue: (partId: string, value: number) => void;
    setDesiredPhysique: (type: string) => void;
    setLocation: (location: string) => void;
    toggleEquipment: (equipment: string) => void;
    toggleMuscle: (muscle: string) => void;
    setFitnessLevel: (level: string) => void;
    setTargetWeight: (weight: number) => void;
    setPlanDuration: (duration: string) => void;
    setWorkoutSchedule: (schedule: WorkoutSchedule[]) => void;
    nextStep: () => void;
    previousStep: () => void;
    resetForm: () => void;
  }
  
  export type UserStore = UserState & UserActions;
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Gender = 'male' | 'female';
export type AgeRange = 'Under Eighteen' | 'Eighteen To TwentyNine' | 'Thirty To ThirtyNine' | 'Fourty To FourtyNine' | 'Fifty To FiftyNine' | 'sixty plus';
export type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type Location = 'home' | 'gym';
export type Equipment = 'dumbbell' | 'barbell' | 'smith-machine' | 'cable-machine' | 'bodyweight' | 'resistance-bands';
export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core';

export type PlanDuration = 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly';
export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';


interface WorkoutSchedule {
  day: WeekDay;
  duration: number;
  startTime: string;
}


interface UserState {
  currentStep: number;
  gender: Gender | null;
  dateOfBirth: Date | null;
  height: number | null;
  weight: number | null;
  targetWeight: number | null;
  bodyType: BodyType | null;
  
  bodyGoals: Record<string, number>;
  desiredPhysique: string | null;

  location: Location | null;
  equipment: Equipment[];
  targetMuscles: MuscleGroup[];
  fitnessLevel: FitnessLevel | null;
  ageRange: AgeRange | null;
  planDuration: PlanDuration | null;
  workoutSchedule: WorkoutSchedule[];
  bodyFat: number | null;

  setCurrentStep: (step: number) => void;
  setGender: (gender: Gender) => void;
  setDateOfBirth: (date: Date) => void;
  setAgeRange: (range: AgeRange) => void;
  setHeight: (height: number) => void;
  setWeight: (weight: number) => void;
  setTargetWeight: (weight: number) => void;
  setBodyType: (type: BodyType) => void;
  
  setBodyGoalValue: (part: string, value: number) => void;
  setDesiredPhysique: (type: string) => void;

  setLocation: (location: Location) => void;
  toggleEquipment: (equipment: Equipment) => void;
  toggleMuscle: (muscle: MuscleGroup) => void;
  setFitnessLevel: (level: FitnessLevel) => void;
  setPlanDuration: (duration: PlanDuration) => void;
  setWorkoutSchedule: (schedule: WorkoutSchedule[]) => void;
  setBodyFat: (value: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetForm: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentStep: 0,
      gender: null,
      dateOfBirth: null,
      ageRange: null,      
      height: null,
      weight: null,
      targetWeight: null,
      bodyType: null,
      bodyGoals: {},
      desiredPhysique: null,
      location: null,
      equipment: [],
      targetMuscles: [],
      fitnessLevel: null,
      planDuration: null,
      workoutSchedule: [],
      bodyFat: null,

      setCurrentStep: (step) => set({ currentStep: step }),
      setGender: (gender) => set({ gender }),
      setDateOfBirth: (date) => set({ dateOfBirth: date }),
      setAgeRange: (range) => set({ ageRange: range }),
      setHeight: (height) => set({ height }),
      setWeight: (weight) => set({ weight }),
      setTargetWeight: (weight) => set({ targetWeight: weight }),
      setBodyType: (type) => set({ bodyType: type }),
      setBodyGoalValue: (part, value) =>
        set((state) => ({
          bodyGoals: { ...state.bodyGoals, [part]: value },
        })),
      setDesiredPhysique: (type) => set({ desiredPhysique: type }),
      setLocation: (location) => set({ location }),
      toggleEquipment: (equipment) =>
        set((state) => ({
          equipment: state.equipment.includes(equipment)
            ? state.equipment.filter((e) => e !== equipment)
            : [...state.equipment, equipment],
        })),
      toggleMuscle: (muscle) =>
        set((state) => ({
          targetMuscles: state.targetMuscles.includes(muscle)
            ? state.targetMuscles.filter((m) => m !== muscle)
            : [...state.targetMuscles, muscle],
        })),
      setFitnessLevel: (level) => set({ fitnessLevel: level }),
      setPlanDuration: (duration) => set({ planDuration: duration }),
      setWorkoutSchedule: (schedule) => set({ workoutSchedule: schedule }),
      setBodyFat: (value) => set({ bodyFat: value }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      previousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
      resetForm: () =>
        set({
          currentStep: 0,
          gender: null,
          dateOfBirth: null,
          ageRange: null,
          height: null,
          weight: null,
          targetWeight: null,
          bodyType: null,
          bodyGoals: {},
          desiredPhysique: null,
          location: null,
          equipment: [],
          targetMuscles: [],
          fitnessLevel: null,
          planDuration: null,
          workoutSchedule: [],
          bodyFat: null,
        }),
    }),
    {
      name: 'fitness-generator-storage',
    }
  )
);
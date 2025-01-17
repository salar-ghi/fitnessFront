import { StateCreator } from 'zustand';
import { UserStore } from './types';

export const createActions = (
  set: StateCreator<UserStore>['setState']
) => ({
  setGender: (gender: "male" | "female") => set({ gender }),
  setAge: (age) => set({ age }),
  setAgeRange: (range) => set({ ageRange: range }),
  setHeight: (height) => set({ height }),
  setWeight: (weight) => set({ weight }),
  setBodyType: (type) => set({ bodyType: type }),
  setHealthCondition: (partId, condition) =>
    set((state) => ({
      healthConditions: {
        ...state.healthConditions,
        [partId]: condition
      }
    })),
  removeHealthCondition: (partId) =>
    set((state) => {
      const { [partId]: _, ...rest } = state.healthConditions;
      return { healthConditions: rest };
    }),
  setBodyGoalValue: (partId, value) =>
    set((state) => ({
      bodyGoals: {
        ...state.bodyGoals,
        [partId]: value
      }
    })),
  setDesiredPhysique: (type) => set({ desiredPhysique: type }),
  setLocation: (location) => set({ location }),
  toggleEquipment: (equipment) =>
    set((state) => ({
      equipment: state.equipment.includes(equipment)
        ? state.equipment.filter((e) => e !== equipment)
        : [...state.equipment, equipment]
    })),
  toggleMuscle: (muscle) =>
    set((state) => ({
      targetMuscles: state.targetMuscles.includes(muscle)
        ? state.targetMuscles.filter((m) => m !== muscle)
        : [...state.targetMuscles, muscle]
    })),
  setFitnessLevel: (level) => set({ fitnessLevel: level }),
  setTargetWeight: (weight) => set({ targetWeight: weight }),
  setPlanDuration: (duration) => set({ planDuration: duration }),
  setWorkoutSchedule: (schedule) => set({ workoutSchedule: schedule }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  previousStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  resetForm: () => set(initialState),
});
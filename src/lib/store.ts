import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph';
export type Gender = 'male' | 'female';
export type Equipment = 'dumbbell' | 'barbell' | 'smith-machine' | 'cable-machine' | 'bodyweight' | 'resistance-bands';
export type Location = 'home' | 'gym';
export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core';

interface UserState {
  currentStep: number;
  gender: Gender | null;
  dateOfBirth: Date | null;
  height: number | null;
  weight: number | null;
  targetWeight: number | null;
  bodyType: BodyType | null;
  location: Location | null;
  equipment: Equipment[];
  targetMuscles: MuscleGroup[];
  setGender: (gender: Gender) => void;
  setDateOfBirth: (date: Date) => void;
  setHeight: (height: number) => void;
  setWeight: (weight: number) => void;
  setTargetWeight: (weight: number) => void;
  setBodyType: (type: BodyType) => void;
  setLocation: (location: Location) => void;
  toggleEquipment: (equipment: Equipment) => void;
  toggleMuscle: (muscle: MuscleGroup) => void;
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
      height: null,
      weight: null,
      targetWeight: null,
      bodyType: null,
      location: null,
      equipment: [],
      targetMuscles: [],
      setGender: (gender) => set({ gender }),
      setDateOfBirth: (date) => set({ dateOfBirth: date }),
      setHeight: (height) => set({ height }),
      setWeight: (weight) => set({ weight }),
      setTargetWeight: (weight) => set({ targetWeight: weight }),
      setBodyType: (type) => set({ bodyType: type }),
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
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      previousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
      resetForm: () =>
        set({
          currentStep: 0,
          gender: null,
          dateOfBirth: null,
          height: null,
          weight: null,
          targetWeight: null,
          bodyType: null,
          location: null,
          equipment: [],
          targetMuscles: [],
        }),
    }),
    {
      name: 'fitness-generator-storage',
    }
  )
);
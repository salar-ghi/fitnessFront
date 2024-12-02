"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DietGoal = 'weight-loss' | 'muscle-gain' | 'maintenance' | 'health';
export type MealPreference = 'anything' | 'vegetarian' | 'vegan' | 'pescatarian';
export type CookingTime = 'minimal' | 'moderate' | 'extensive';

interface DietState {
  currentStep: number;
  goal: DietGoal | null;
  targetCalories: number | null;
  mealPreference: MealPreference | null;
  cookingTime: CookingTime | null;
  allergies: string[];
  excludedFoods: string[];
  mealsPerDay: number;
  snacksPerDay: number;
  setGoal: (goal: DietGoal) => void;
  setTargetCalories: (calories: number) => void;
  setMealPreference: (pref: MealPreference) => void;
  setCookingTime: (time: CookingTime) => void;
  toggleAllergy: (allergy: string) => void;
  toggleExcludedFood: (food: string) => void;
  setMealsPerDay: (meals: number) => void;
  setSnacksPerDay: (snacks: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetForm: () => void;
}

export const useDietStore = create<DietState>()(
  persist(
    (set) => ({
      currentStep: 0,
      goal: null,
      targetCalories: null,
      mealPreference: null,
      cookingTime: null,
      allergies: [],
      excludedFoods: [],
      mealsPerDay: 3,
      snacksPerDay: 2,
      setGoal: (goal) => set({ goal }),
      setTargetCalories: (calories) => set({ targetCalories: calories }),
      setMealPreference: (pref) => set({ mealPreference: pref }),
      setCookingTime: (time) => set({ cookingTime: time }),
      toggleAllergy: (allergy) =>
        set((state) => ({
          allergies: state.allergies.includes(allergy)
            ? state.allergies.filter((a) => a !== allergy)
            : [...state.allergies, allergy],
        })),
      toggleExcludedFood: (food) =>
        set((state) => ({
          excludedFoods: state.excludedFoods.includes(food)
            ? state.excludedFoods.filter((f) => f !== food)
            : [...state.excludedFoods, food],
        })),
      setMealsPerDay: (meals) => set({ mealsPerDay: meals }),
      setSnacksPerDay: (snacks) => set({ snacksPerDay: snacks }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      previousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
      resetForm: () =>
        set({
          currentStep: 0,
          goal: null,
          targetCalories: null,
          mealPreference: null,
          cookingTime: null,
          allergies: [],
          excludedFoods: [],
          mealsPerDay: 3,
          snacksPerDay: 2,
        }),
    }),
    {
      name: 'diet-generator-storage',
    }
  )
);
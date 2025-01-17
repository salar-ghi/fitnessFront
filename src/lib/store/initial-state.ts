import { UserState } from './types';

export const initialState: UserState = {
  currentStep: 0,
  gender: null,
  age: null,
  ageRange: null,
  height: null,
  weight: null,
  bodyType: null,
  healthConditions: {},
  bodyGoals: {},
  desiredPhysique: null,
  location: null,
  equipment: [],
  targetMuscles: [],
  fitnessLevel: null,
  targetWeight: null,
  planDuration: null,
  workoutSchedule: [],
};
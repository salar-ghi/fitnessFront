"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStore } from './types';
import { initialState } from './initial-state';
import { createActions } from './actions';

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,
      ...createActions(set),
    }),
    {
      name: 'fitness-generator-storage'
    }
  )
);

export type { UserStore, UserState, UserActions, HealthCondition, WorkoutSchedule } from './types';
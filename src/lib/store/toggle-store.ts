// "use client";

// import { create } from 'zustand';
// // import { persist } from 'zustand/middleware';


// interface ToggleState {
//     isCollapsed: boolean;
//     setIsCollapsed: (collapsed: boolean) => void;
// }

// const useToggleStore = create<ToggleState>((set) => ({
//     isCollapsed: false,
//     setIsCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
// }));

// export default useToggleStore;


import { create } from 'zustand';

interface StoreState {
    isToggled: boolean;
    toggle: () => void;
}

const useToggleStore = create<StoreState>((set) => ({
    isToggled: false,
    toggle: () => set((state) => ({ isToggled: !state.isToggled })),
}));

export default useToggleStore;
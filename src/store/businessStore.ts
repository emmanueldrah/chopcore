import { create } from 'zustand';

export enum BusinessMode {
  FAST_FOOD = "FAST_FOOD",
  SIT_DOWN = "SIT_DOWN",
  CHOP_BAR = "CHOP_BAR",
  CATERING = "CATERING"
}

interface BusinessState {
  mode: BusinessMode | null;
  isSetup: boolean;
  setMode: (mode: BusinessMode) => void;
  setIsSetup: (isSetup: boolean) => void;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  mode: null,
  isSetup: false,
  setMode: (mode) => set({ mode }),
  setIsSetup: (isSetup) => set({ isSetup }),
}));

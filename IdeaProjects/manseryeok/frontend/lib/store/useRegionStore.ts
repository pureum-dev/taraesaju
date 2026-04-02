import { create } from 'zustand';

/** Type & Interface */
import { regionInterface } from '@/service/regionService';

interface RegionlState {
    regionData: regionInterface | null;
    getRegionData: () => regionInterface | null;
    setRegionData: (value: regionInterface) => void;
    resetRegionData: () => void;
}

export const useRegionStore = create<RegionlState>((set, get) => ({
    regionData: null,

    getRegionData: () => get().regionData,

    setRegionData: (value) => set({ regionData: value }),

    resetRegionData: () => set({ regionData: null }),
}));

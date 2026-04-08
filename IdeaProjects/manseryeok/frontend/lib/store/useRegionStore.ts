import { create } from 'zustand';

/** Type & Interface */
import { RegionJsonData } from '@/type/jsonDataInterface';

interface RegionlState {
    RegionJsonData: RegionJsonData | null;
    getRegionJsonData: () => RegionJsonData | null;
    setRegionJsonData: (value: RegionJsonData) => void;
    resetRegionJsonData: () => void;
}

export const useRegionStore = create<RegionlState>((set, get) => ({
    RegionJsonData: null,

    getRegionJsonData: () => get().RegionJsonData,

    setRegionJsonData: (value) => set({ RegionJsonData: value }),

    resetRegionJsonData: () => set({ RegionJsonData: null }),
}));

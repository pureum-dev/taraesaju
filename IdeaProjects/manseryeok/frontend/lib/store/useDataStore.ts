import { create } from 'zustand';

/** Type & Interface */
import { birthDataInterface } from '@/service/birthDataService';
import { birthAllDataInterface } from '@/type/birthDataInterface';

interface DataState {
    profileData: birthDataInterface | null;
    data: birthAllDataInterface | null;

    getProfileData: () => birthDataInterface | null;
    setProfileData: (value: birthDataInterface) => void;
    resetProfileData: () => void;
    getData: () => birthAllDataInterface | null;
    setData: (value: birthAllDataInterface) => void;
    resetData: () => void;
}

export const useDataStore = create<DataState>((set, get) => ({
    profileData: null,
    data: null,

    getProfileData: () => get().profileData,
    setProfileData: (value) => set({ profileData: value }),
    resetProfileData: () => set({ profileData: null }),

    getData: () => get().data,
    setData: (value) => set({ data: value }),
    resetData: () => set({ data: null }),
}));

import { create } from 'zustand';

/** Type & Interface */
import { birthDataInterface } from '@/service/birthDataService';
import { BirthAllData } from '@/type/birthDataInterface';

interface DataState {
    profileData: birthDataInterface | null;
    data: BirthAllData | null;

    getProfileData: () => birthDataInterface | null;
    setProfileData: (value: birthDataInterface) => void;
    resetProfileData: () => void;
    getData: () => BirthAllData | null;
    setData: (value: BirthAllData) => void;
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

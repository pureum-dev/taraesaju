import { create } from 'zustand';

interface ModalState {
    modalData: any;
    setModalData: (value: any) => void;
    resetModalData: () => void;

    modalCloseEvent: () => void;
    setModalCloseEvent: (value: any) => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
    modalData: null,

    setModalData: (value) => set({ modalData: value }),

    resetModalData: () => set({ modalData: null }),

    modalCloseEvent: () => {},

    setModalCloseEvent: (modalCloseEvent) => set({ modalCloseEvent }),
}));

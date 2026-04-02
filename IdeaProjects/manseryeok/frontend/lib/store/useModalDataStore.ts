import { create } from 'zustand';

interface ModalState {
    modalData: any;
    getModalData: () => any;
    setModalData: (value: any) => void;
    resetModalData: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
    modalData: null,

    getModalData: () => get().modalData,

    setModalData: (value) => set({ modalData: value }),

    resetModalData: () => set({ modalData: null }),
}));

import { create } from 'zustand';

interface LoadingState {
    loading: boolean;
    error: any;
    setLoading: (loading: boolean) => void;
    setError: (error: any) => void;
}

const useLoadingStore = create<LoadingState>((set) => ({
    loading: false,
    error: null,

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));

export default useLoadingStore;

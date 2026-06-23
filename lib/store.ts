import { create } from 'zustand';

interface WorkspaceState {
  activeClientId: string | null;
  selectedDeadlineId: string | null;
  setActiveClientId: (id: string | null) => void;
  setSelectedDeadlineId: (id: string | null) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  activeClientId: null,
  selectedDeadlineId: null,
  setActiveClientId: (id) => set({ activeClientId: id }),
  setSelectedDeadlineId: (id) => set({ selectedDeadlineId: id }),
}));

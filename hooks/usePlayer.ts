import { create } from "zustand";

type PlayerStore = {
	ids: string[];
	setIds: (ids: string[]) => void;
	activeId?: string;
	setActiveId: (id: string) => void;
	reset: () => void;
};

const usePlayer = create<PlayerStore>((set) => ({
	ids: [],
	setIds: (ids: string[]) => set({ ids: ids }),
	activeId: undefined,
	setActiveId: (id: string) => set({ activeId: id }),
	reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;

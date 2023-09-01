import { create } from "zustand";

type uploadModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useUploadModal = create<uploadModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useUploadModal;

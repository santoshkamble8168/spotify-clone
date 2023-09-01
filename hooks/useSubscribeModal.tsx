import { create } from "zustand";

type subscribeModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useSubscribeModal = create<subscribeModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useSubscribeModal;

import React, { use } from "react";

import usePlayer from "./usePlayer";
import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";

import { Song } from "@/types";
import useSubscribeModal from "./useSubscribeModal";

const useOnPlay = (songs: Song[]) => {
	const player = usePlayer();
	const authModal = useAuthModal();
	const subscribeModal = useSubscribeModal();
	const { user, subscription } = useUser();

	const onPlay = (id: string) => {
		if (!user) return authModal.onOpen();

		if (!subscription) return subscribeModal.onOpen();

		player.setActiveId(id);
		player.setIds(songs.map((song) => song.id));
	};

	return onPlay;
};

export default useOnPlay;

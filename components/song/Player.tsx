"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSong from "@/hooks/useLoadSong";
import usePlayer from "@/hooks/usePlayer";
import React from "react";
import PlayerContent from "./PlayerContent";

type Props = {};

const Player = () => {
	const player = usePlayer();
	const { song } = useGetSongById(player.activeId);

	const songUrl = useLoadSong(song!);

	if (!songUrl || !songUrl || !player.activeId) {
		return null;
	}

	return (
		<div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
			{song && (<PlayerContent key={songUrl} song={song} songUrl={songUrl} />)}
		</div>
	);
};

export default Player;

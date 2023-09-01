"use client";

import { Song } from "@/types";
import React from "react";
import SongItem from "./SongItem";
import useOnPlay from "@/hooks/useOnPlay";

type SongContentProps = {
	songs: Song[];
};

const SongContent: React.FC<SongContentProps> = ({ songs }) => {
	const onPlay = useOnPlay(songs);

	if (songs.length === 0) {
		return <div className="mt-4 text-neutral-400">No songs available.</div>;
	}

	return (
		<div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-col-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
			{songs.map((song) => (
				<SongItem key={song.id} onClick={(id: string) => onPlay(id)} song={song} />
			))}
		</div>
	);
};

export default SongContent;

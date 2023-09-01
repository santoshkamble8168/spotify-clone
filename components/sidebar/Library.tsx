"use client";

import React from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "../song/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";

type LibraryProps = {
	songs: Song[];
};

const Library: React.FC<LibraryProps> = ({ songs }) => {
	const authModal = useAuthModal();
	const uploadModal = useUploadModal();
	const subscribeModal = useSubscribeModal();
	const onPlay = useOnPlay(songs);

	const { user, subscription } = useUser();

	const handleClick = () => {
		if (!user) {
			return authModal.onOpen();
		}

		if (!subscription) {
			return subscribeModal.onOpen();
		}

		return uploadModal.onOpen();
	};

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between px-5 pt-4">
				<div className="inline-flex items-center gap-x-2">
					<TbPlaylist size={26} className="text-neutral-400" />
					<p className="text-neutral-400 font-medium text-md">Your library</p>
				</div>
				<AiOutlinePlus
					size={20}
					onClick={handleClick}
					className="text-neutral-400 rounded-full cursor-pointer hover:text-white transition hover:rounded-full hover:bg-neutral-800"
				/>
			</div>
			<div className="flex flex-col gap-y-2 mt-4 px-3">
				{songs.map((song) => (
					<MediaItem key={song.id} onClick={(id: string) => onPlay(id)} song={song} />
				))}
			</div>
		</div>
	);
};

export default Library;

"use client";

import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeSong from "./LikeSong";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import VolumeSilder from "./VolumeSilder";
import usePlayer from "@/hooks/usePlayer";

type PlayerContentProps = {
	song: Song;
	songUrl: string;
};

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
	const player = usePlayer();

	const [volume, setVolume] = useState(1);
	const [isPlaying, setIsPlaying] = useState(false);

	const [play, { pause, sound }] = useSound(songUrl, {
		volume: volume,
		onplay: () => setIsPlaying(true),
		onended: () => {
			setIsPlaying(false);
			onPlayNext();
		},
		onpause: () => setIsPlaying(false),
		format: ["mp3"],
	});

	useEffect(() => {
		sound?.play();

		return () => {
			sound?.unload();
		};
	}, [sound]);

	const Icon = isPlaying ? BsPauseFill : BsPlayFill;
	const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

	const handlePlay = () => {
		if (!isPlaying) {
			play();
		} else {
			pause();
		}
	};

	const toggleMute = () => {
		if (volume === 0) {
			setVolume(1);
		} else {
			setVolume(0);
		}
	};

	const onPlayNext = () => {
		if (player.ids.length === 0) return;

		const currentIndex = player.ids.findIndex((id) => id === player.activeId);
		const nextSong = player.ids[currentIndex + 1];

		if (!nextSong) {
			//if its last song in the list start with 1st again
			return player.setActiveId(player.ids[0]);
		}

		player.setActiveId(nextSong);
	};

	const onPlayPrevious = () => {
		if (player.ids.length === 0) return;

		const currentIndex = player.ids.findIndex((id) => id === player.activeId);
		const previousSong = player.ids[currentIndex - 1];

		if (!previousSong) {
			//if currently playing 1st song then play the last song
			return player.setActiveId(player.ids[player.ids.length - 1]);
		}

		player.setActiveId(previousSong);
	};

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 h-full items-center">
			<div className="flex w-full justify-start">
				<div className="flex items-center gap-x-4">
					<MediaItem song={song} />
					<LikeSong songId={song.id} />
				</div>
			</div>
			<div className="flex md:hidden col-auto w-full justify-end items-center">
				<div onClick={handlePlay} className="h-10 w-10flex items-center justify-center rounded-full  p-1 cursor-pointer bg-green-600 ">
					<Icon size={30} className="text-white" />
				</div>
			</div>
			<div className="hidden h-full md:flex justify-center items-center w-full max-x-[722px] gap-x-6">
				<AiFillStepBackward onClick={onPlayPrevious} size={30} className="text-neutral-400 cursor-pointer hover:text-white transition" />
				<div className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-2 cursor-pointer">
					<Icon onClick={handlePlay} size={30} className="text-black" />
				</div>
				<AiFillStepForward onClick={onPlayNext} size={30} className="text-neutral-400 cursor-pointer hover:text-white transition" />
			</div>

			<div className="hidden md:flex w-full justify-end pr-2">
				<div className="flex items-center gap-x-2 w-[120px]">
					<VolumeIcon onClick={toggleMute} size={35} className="cursor-pointer" />
					<VolumeSilder value={volume} onChange={(value) => setVolume(value)} />
				</div>
			</div>
		</div>
	);
};

export default PlayerContent;

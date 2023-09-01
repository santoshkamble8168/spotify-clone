"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";

type LikeSongProps = {
	songId: string;
};

const LikeSong: React.FC<LikeSongProps> = ({ songId }) => {
	const router = useRouter();
	const { supabaseClient } = useSessionContext();

	const authModal = useAuthModal();
	const { user } = useUser();

	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		if (!user?.id) {
			return;
		}

		const getLikedStatus = async () => {
			const { data, error } = await supabaseClient.from("liked_songs").select("*").eq("user_id", user.id).eq("song_id", songId).single();

			if (!error && data) {
				setIsLiked(true);
			}
		};

		getLikedStatus();
	}, [songId, supabaseClient, user?.id]);

	const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

	const handleClick = async () => {
		try {
			if (!user) {
				return authModal.onOpen();
			}

			if (isLiked) {
				const { data, error } = await supabaseClient.from("liked_songs").delete().eq("user_id", user.id).eq("song_id", songId).single();

				if (error) {
					toast.error(error.message);
				} else {
					setIsLiked(false);
				}
			} else {
				const { data, error } = await supabaseClient.from("liked_songs").insert({
					song_id: songId,
					user_id: user.id,
				});

				if (error) {
					toast.error(error.message);
				} else {
					setIsLiked(true);
					toast.success("Liked the song!");
				}
			}
			router.refresh();
		} catch (error) {
			toast.error("Something went wrong!");
		}
	};

	return (
		<button onClick={handleClick} className="hover:opacity-75 transition">
			<Icon color={isLiked ? "#22c55e" : "white"} size={25} />
		</button>
	);
};

export default LikeSong;

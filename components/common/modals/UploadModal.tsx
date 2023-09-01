"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast/headless";
import uniqid from "uniqid";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import Modal from "./Modal";
import Input from "../Input";
import Button from "../Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type Props = {};

const UploadModal = () => {
	const router = useRouter();
	const uploadModal = useUploadModal();
	const { user } = useUser();
	const supabaseClient = useSupabaseClient();

	const [isLoading, setIsLoading] = useState(false);

	const { register, handleSubmit, reset } = useForm<FieldValues>({
		defaultValues: {
			author: "",
			title: "",
			song: null,
			image: null,
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true);
			const imageFile = values.image?.[0];
			const songFile = values.song?.[0];

			if (!imageFile || !songFile || !user) {
				toast.error("Miising fields");
				return;
			}

			const uniqueID = uniqid();

			// Upload song
			const { data: songData, error: songError } = await supabaseClient.storage
				.from("songs")
				.upload(`song-${values.title}-${uniqueID}`, songFile, {
					cacheControl: "3600",
					upsert: false,
				});

			if (songError) {
				setIsLoading(false);
				toast.error("Failed song upload");
				return;
			}

			// Upload image
			const { data: imageData, error: imageError } = await supabaseClient.storage
				.from("images")
				.upload(`image-${values.title}-${uniqueID}`, imageFile, {
					cacheControl: "3600",
					upsert: false,
				});

			if (imageError) {
				setIsLoading(false);
				toast.error("Failed image upload");
				return;
			}

			const { error: supabaseError } = await supabaseClient.from("songs").insert({
				user_id: user.id,
				title: values.title,
				author: values.author,
				image_path: imageData.path,
				song_path: songData.path,
			});

			if (supabaseError) {
				setIsLoading(false);
				toast.error(supabaseError.message);
				return;
			}

			router.refresh();
			setIsLoading(false);
			toast.success("Song created!");
			reset();
			uploadModal.onClose();
		} catch (error: any) {
			toast.error("Something went wrong!");
		} finally {
			setIsLoading(false);
		}
	};

	const onChange = (open: boolean) => {
		if (!open) {
			reset(); //reset the form
			uploadModal.onClose(); //close the modal
		}
	};

	return (
		<Modal title="Add a song" description="Upload an mp3 file" isOpen={uploadModal.isOpen} onChange={onChange}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
				<Input id="title" disabled={isLoading} {...register("title", { required: true })} placeholder="Song title" />
				<Input id="author" disabled={isLoading} {...register("author", { required: true })} placeholder="Author of the song" />
				<div>
					<div className="pb-1">Select a song file</div>
					<Input id="song" type="file" accept=".mp3" disabled={isLoading} {...register("song", { required: true })} />
				</div>
				<div>
					<div className="pb-1">Select an Image for the song</div>
					<Input id="image" type="file" accept="image/*" disabled={isLoading} {...register("image", { required: true })} />
				</div>
				<Button type="submit" disabled={isLoading}>
					Create
				</Button>
			</form>
		</Modal>
	);
};

export default UploadModal;

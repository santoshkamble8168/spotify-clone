"use client";

import Box from "@/components/sidebar/Box";
import React from "react";

type Props = {};

const Error = () => {
	return (
		<Box className="h-full flex items-center justify-center">
			<div className="text-neutral-400">Something went wrong!</div>
		</Box>
	);
};

export default Error;

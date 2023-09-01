import Box from "@/components/sidebar/Box";
import React from "react";
import { BounceLoader } from "react-spinners";

type Props = {};

const Loading = (props: Props) => {
	return (
		<Box className="h-full flex items-center justify-center">
			<BounceLoader color="#22c55e" size={40} />
		</Box>
	);
};

export default Loading;

"use client";

import React, { useState, useEffect } from "react";

import AuthModal from "@/components/common/modals/AuthModal";
import UploadModal from "@/components/common/modals/UploadModal";
import SubscribeModal from "@/components/common/modals/SubscribeModal";
import { ProductWithPrice } from "@/types";

type ModalProviderProps = {
	products: ProductWithPrice[];
};

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted((prev) => true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<UploadModal />
			<AuthModal />
			<SubscribeModal products={products} />
		</>
	);
};

export default ModalProvider;

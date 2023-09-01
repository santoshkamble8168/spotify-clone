import AccountInfo from "@/components/account/AccountInfo";
import Header from "@/components/header/Header";
import React from "react";

type Props = {};

const Account = (props: Props) => {
	return (
		<div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
			<Header className="from-bg-neutral-900">
				<div className="mb-2 flex flex-col gap-y-6">
					<h1 className="text-white text-3xl font-semibold">Account Settings</h1>
				</div>
			</Header>
			<AccountInfo />
		</div>
	);
};

export default Account;

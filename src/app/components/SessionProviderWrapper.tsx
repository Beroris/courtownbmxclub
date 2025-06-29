"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

export default function SessionProviderWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [supabaseClient] = useState(() => createClientComponentClient());

	return (
		<SessionContextProvider supabaseClient={supabaseClient}>
			{children}
		</SessionContextProvider>
	);
}

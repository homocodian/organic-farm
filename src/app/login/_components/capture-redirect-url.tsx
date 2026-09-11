"use client";

import { useSearchParams } from "next/navigation";

export function CaptureRedirectUrl() {
	const searchParams = useSearchParams();
	const callback = searchParams.get("redirect") || "";

	console.log("CaptureRedirect callback:", callback);

	return <input type="hidden" name="redirect" value={callback} />;
}

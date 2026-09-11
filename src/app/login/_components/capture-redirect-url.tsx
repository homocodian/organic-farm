"use client";

import { useSearchParams } from "next/navigation";

export function CaptureRedirectUrl() {
	const searchParams = useSearchParams();
	const callback = searchParams.get("redirect") || "";
	return <input type="hidden" name="redirect" value={callback} />;
}

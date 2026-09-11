import { Loader2 } from "lucide-react";

export function FullScreenLoader() {
	return (
		<div className="min-h-[calc(100vh-65px)] flex justify-center items-center">
			<span>
				<Loader2 className="size-8 animate-spin" />
			</span>
		</div>
	);
}

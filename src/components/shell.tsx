import { AppConfig } from "@/lib/app-config";
import { GalleryVerticalEnd } from "lucide-react";
import { PropsWithChildren } from "react";

export function Shell({ children }: PropsWithChildren) {
	return (
		<div className="bg-background flex flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex flex-col items-center gap-2 font-medium">
				<div className="flex size-8 items-center justify-center rounded-md">
					<GalleryVerticalEnd className="size-8" />
				</div>
				<span className="sr-only">{AppConfig.name}</span>
			</div>
			<div className="w-full max-w-md">{children}</div>
		</div>
	);
}

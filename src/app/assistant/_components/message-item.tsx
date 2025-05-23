import { cn } from "@/lib/utils";
import { Message } from "./chat-interface";
import { FilePreview } from "./file-preview";
import Markdown from "marked-react";

interface MessageItemProps {
	message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
	const isUser = message.role === "user";

	return (
		<div className={cn("flex items-start gap-3 py-4", isUser && "justify-end")}>
			{!isUser && (
				<div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
					<span className="text-primary text-sm">AI</span>
				</div>
			)}

			<div className={cn("flex flex-col max-w-[80%]", isUser && "items-end")}>
				{message.files && message.files.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-2">
						{message.files.map((file, index) => (
							<FilePreview key={index} file={file} />
						))}
					</div>
				)}

				<div
					className={cn(
						"rounded-lg px-4 py-2",
						isUser ? "bg-primary text-primary-foreground" : "bg-muted"
					)}
				>
					<Markdown>{message.content}</Markdown>
				</div>
			</div>

			{isUser && (
				<div className="size-8 rounded-full bg-primary flex items-center justify-center">
					<span className="text-primary-foreground text-sm">You</span>
				</div>
			)}
		</div>
	);
}

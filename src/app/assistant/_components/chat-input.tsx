"use client";

import { cn } from "@/lib/utils";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PaperclipIcon, SendIcon, XIcon } from "lucide-react";
import { FilePreview } from "./file-preview";

interface ChatInputProps {
	onSendMessageAction: (content: string, files?: File[]) => void;
	isLoading: boolean;
}

export function ChatInput({ onSendMessageAction, isLoading }: ChatInputProps) {
	const [message, setMessage] = useState("");
	const [files, setFiles] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim() || files.length > 0) {
			onSendMessageAction(message, files.length > 0 ? files : undefined);
			setMessage("");
			setFiles([]);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files);
			setFiles((prev) => [...prev, ...newFiles]);
		}
	};

	const removeFile = (index: number) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<form onSubmit={handleSubmit} className="relative">
			{files.length > 0 && (
				<div className="flex flex-wrap gap-2 p-2 border rounded-t-lg">
					{files.map((file, index) => (
						<div key={index} className="relative group">
							<FilePreview file={file} small />
							<Button
								type="button"
								size="icon"
								variant="destructive"
								className="absolute -top-2 -right-2 size-5 opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={() => removeFile(index)}
							>
								<XIcon className="size-3" />
							</Button>
						</div>
					))}
				</div>
			)}

			<div
				className={cn(
					"flex items-end gap-2 border rounded-lg p-2",
					files.length > 0 && "rounded-t-none border-t-0"
				)}
			>
				<Button
					type="button"
					size="icon"
					variant="ghost"
					className="rounded-full"
					onClick={() => fileInputRef.current?.click()}
				>
					<PaperclipIcon className="size-5" />
					<span className="sr-only">Attach files</span>
				</Button>

				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
					className="hidden"
					multiple
				/>

				<Textarea
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Type a message..."
					className="min-h-10 resize-none border-0 focus-visible:ring-0 flex-1 shadow-none bg-transparent focus-visible:ring-transparent focus-visible:outline-none"
					rows={1}
				/>

				<Button
					type="submit"
					size="icon"
					className="rounded-full"
					disabled={isLoading || (!message.trim() && files.length === 0)}
				>
					<SendIcon className="size-5" />
					<span className="sr-only">Send message</span>
				</Button>
			</div>
		</form>
	);
}

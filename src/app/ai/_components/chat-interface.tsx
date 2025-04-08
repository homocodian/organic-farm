"use client";

import { useCallback, useState } from "react";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { toast } from "sonner";

export interface Message {
	content: string;
	role: "user" | "assistant";
	files?: File[];
	id: string;
}

export function ChatInterface() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: crypto.randomUUID(),
			role: "assistant",
			content: "Hello! How can I help you today?",
			files: [],
		},
	]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSendMessage = useCallback(
		async (content: string, files?: File[]) => {
			if (!content.trim() && (!files || files.length === 0)) return;

			const userMessage: Message = {
				id: crypto.randomUUID(),
				content,
				role: "user",
				files,
			};

			setMessages((prev) => [...prev, userMessage]);
			setIsLoading(true);

			try {
				const response = await fetch("/api/chat", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ prompt: content }),
				});

				if (!response.ok || !response.body) {
					toast.error("Error: while genarating text");
					setIsLoading(false);
					return;
				}

				const reader = response.body.getReader();
				const decoder = new TextDecoder();
				let done = false;
				let buffer = "";
				const assistantMessageId = crypto.randomUUID();

				// Append an initial empty assistant message
				setMessages((prev) => [
					...prev,
					{ id: assistantMessageId, role: "assistant", content: "", files: [] },
				]);

				while (!done) {
					const { value, done: streamDone } = await reader.read();
					done = streamDone;
					if (value) {
						const textChunk = decoder.decode(value);
						buffer += textChunk;
					}
				}

				console.log("Stream finished on the client.");
				reader.releaseLock();

				setMessages((prev) => {
					const lastMessage = prev.find((m) => m.id === assistantMessageId);
					if (!lastMessage) return prev;

					const updated = prev.map((m) =>
						m.id === assistantMessageId
							? { ...m, content: m.content + buffer }
							: m
					);
					return updated;
				});

				setIsLoading(false);
			} catch (error) {
				console.error("Error consuming stream:", error);
			}
		},
		[]
	);

	return (
		<div className="flex flex-col w-full max-w-4xl h-[calc(100vh-65px)] mx-auto">
			<div className="flex-1 overflow-hidden">
				<ChatMessages messages={messages} isLoading={isLoading} />
			</div>
			<div className="p-4 border-t">
				<ChatInput
					onSendMessageAction={handleSendMessage}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}

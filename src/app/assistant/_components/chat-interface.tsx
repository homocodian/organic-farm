"use client";

import { useCallback, useState } from "react";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { decodeStreamToText, getStream } from "../_utils/stream";

export interface Message {
  content: string;
  role: "user" | "assistant";
  files?: File[];
  id: string;
  status?: "error" | "pending" | "success";
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: `Hello! How can I help you today?\n\nनमस्ते! मैं आपकी आज किस तरह मदद कर सकता हूँ?`,
      files: [],
    },
  ]);

  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback(
    (message: Omit<Message, "id">) => {
      const messageWithId = { ...message, id: crypto.randomUUID() as string };
      setMessages((messages) => [...messages, messageWithId]);

      return messageWithId;
    },
    [setMessages],
  );

  const appendMessageToChat = useCallback(
    (message: string) => {
      setMessages((messages) => {
        const latestMessage = messages[messages.length - 1];
        return [
          ...messages.slice(0, -1),
          { ...latestMessage, content: latestMessage.content + message },
        ];
      });
    },
    [setMessages],
  );

  const handleSendMessage = useCallback(
    async (content: string, files?: File[]) => {
      if (!content.trim() && (!files || files.length === 0)) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        content,
        role: "user",
        files,
      };

      addMessage(userMessage);

      setIsStreaming(true);
      setIsLoading(true);

      try {
        const stream = await getStream(content);

        // Append an initial empty assistant message
        addMessage({ role: "assistant", content: "", files: [] });
        setIsLoading(false);

        for await (const chunk of decodeStreamToText(stream)) {
          appendMessageToChat(chunk);
        }
      } catch (error) {
        addMessage({
          content: "Something went wrong fetching AI response",
          role: "assistant",
        });
        console.error("Error consuming stream:", error);
      } finally {
        setIsLoading(false);
        setIsStreaming(false);
      }
    },
    // eslint-disable-next-line
    [],
  );

  return (
    <div className="flex flex-col w-full container h-[calc(100vh-65px)] mx-auto">
      <div className="flex-1 overflow-hidden">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </div>
      <div className="p-4 border-t">
        <ChatInput
          onSendMessageAction={handleSendMessage}
          isLoading={isStreaming}
        />
      </div>
    </div>
  );
}

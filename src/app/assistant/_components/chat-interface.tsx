"use client";

import { useRef } from "react";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { decodeStreamToText, getStream } from "../_utils/stream";
import { Message, useChat } from "../_store/chat";

export function ChatInterface() {
  const messages = useChat((s) => s.messages);
  const addMessage = useChat((s) => s.addMessage);
  const appendMessageToChat = useChat((s) => s.appendMessageToChat);
  const setIsLoading = useChat((s) => s.setIsLoading);
  const setIsStreaming = useChat((s) => s.setIsStreaming);

  const abortController = useRef<AbortController | null>(null);

  const stopStreaming = () => {
    abortController.current?.abort();
  };

  const handleSendMessage = async (content: string, files?: File[]) => {
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
      abortController.current = new AbortController();

      const stream = await getStream(content, {
        signal: abortController.current.signal,
      });

      // Append an initial empty assistant message
      addMessage({ role: "assistant", content: "", files: [] });
      setIsLoading(false);

      for await (const chunk of decodeStreamToText(stream)) {
        appendMessageToChat(chunk);
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        addMessage({
          content: "Cancelled!",
          role: "assistant",
          status: "error",
        });

        return;
      }

      addMessage({
        content: "Something went wrong fetching AI response",
        role: "assistant",
      });

      console.error("Error consuming stream:", error);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortController.current = null;
    }
  };

  return (
    <div className="flex flex-col w-full container h-[calc(100vh-65px)] mx-auto">
      <div className="flex-1 overflow-hidden">
        <ChatMessages messages={messages} />
      </div>
      <div className="p-4 border-t">
        <ChatInput
          onSendMessageAction={handleSendMessage}
          stopStreamingAction={stopStreaming}
        />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import MessageItem from "./message-item";
import { Skeleton } from "@/components/ui/skeleton";
import { Message, useChat } from "../_store/chat";

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = useChat((s) => s.isLoading);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col p-4 overflow-y-auto h-full">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex items-start gap-3 py-4">
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-sm">AI</span>
          </div>
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

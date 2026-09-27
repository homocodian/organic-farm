'use client';

import { useEffect, useRef } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

import { Message, useChat } from '../_store/chat';
import MessageItem from './message-item';

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = useChat((s) => s.isLoading);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-full flex-col overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex items-start gap-3 py-4">
          <div className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
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

'use client';

import { useRef } from 'react';

import { Message, useChat } from '../_store/chat';
import { decodeStreamToText, getStream } from '../_utils/stream';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';

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
      role: 'user',
      files
    };

    addMessage(userMessage);

    setIsStreaming(true);
    setIsLoading(true);

    try {
      abortController.current = new AbortController();

      const stream = await getStream(content, {
        signal: abortController.current.signal
      });

      // Append an initial empty assistant message
      addMessage({ role: 'assistant', content: '', files: [] });
      setIsLoading(false);

      for await (const chunk of decodeStreamToText(stream)) {
        appendMessageToChat(chunk);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        addMessage({
          content: 'Cancelled!',
          role: 'assistant',
          status: 'error'
        });

        return;
      }

      addMessage({
        content: 'Something went wrong fetching AI response',
        role: 'assistant'
      });

      console.error('Error consuming stream:', error);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortController.current = null;
    }
  };

  return (
    <div className="container mx-auto flex h-[calc(100vh-65px)] w-full flex-col">
      <div className="flex-1 overflow-hidden">
        <ChatMessages messages={messages} />
      </div>
      <div className="border-t p-4">
        <ChatInput
          onSendMessageAction={handleSendMessage}
          stopStreamingAction={stopStreaming}
        />
      </div>
    </div>
  );
}

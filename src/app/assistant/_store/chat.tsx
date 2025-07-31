"use client";

import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";

export interface Message {
  content: string;
  role: "user" | "assistant";
  files?: File[];
  id: string;
  status?: "error" | "pending" | "success";
}

interface ChatProps {
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
}

interface ChatState extends ChatProps {
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Omit<Message, "id">) => Message;
  appendMessageToChat: (message: string) => void;

  setIsStreaming: (state: boolean) => void;
  setIsLoading: (state: boolean) => void;
}

type ChatStore = ReturnType<typeof createChatStore>;

const createChatStore = (initProps?: Partial<ChatProps>) => {
  const DEFAULT_PROPS: ChatProps = {
    messages: [
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Hello! How can I help you today?\n\nनमस्ते! मैं आपकी आज किस तरह मदद कर सकता हूँ?`,
        files: [],
      },
    ],
    isLoading: false,
    isStreaming: false,
  };

  return createStore<ChatState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,

    setMessages: (messages) => {
      set(() => ({ messages }));
    },

    addMessage: (message) => {
      const messageWithId = { ...message, id: crypto.randomUUID() as string };
      set((state) => ({ messages: [...state.messages, messageWithId] }));
      return messageWithId;
    },

    appendMessageToChat: (message) => {
      set((state) => {
        const latestMessage = state.messages[state.messages.length - 1];
        return {
          messages: [
            ...state.messages.slice(0, -1),
            { ...latestMessage, content: latestMessage.content + message },
          ],
        };
      });
    },

    setIsLoading: (state) => {
      set(() => ({
        isLoading: state,
      }));
    },

    setIsStreaming: (state) => {
      set(() => ({
        isStreaming: state,
      }));
    },
  }));
};

const ChatContext = createContext<ChatStore | null>(null);

type ChatProviderProps = React.PropsWithChildren<Partial<ChatProps>>;

export function ChatProvider({ children, ...props }: ChatProviderProps) {
  const storeRef = useRef<ChatStore>(null);

  if (!storeRef.current) {
    storeRef.current = createChatStore(props);
  }

  return (
    <ChatContext.Provider value={storeRef.current}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat<T>(selector: (state: ChatState) => T): T {
  const store = useContext(ChatContext);
  if (!store) throw new Error("Missing ChatContext.Provider in the tree");
  return useStore(store, selector);
}

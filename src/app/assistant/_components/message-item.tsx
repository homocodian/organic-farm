import Markdown from 'marked-react';

import { cn } from '@/lib/utils';

import { Message } from '../_store/chat';
import { FilePreview } from './file-preview';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex items-start gap-3 py-4', isUser && 'justify-end')}>
      {!isUser && (
        <div className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
          <span className="text-primary text-sm">AI</span>
        </div>
      )}

      <div className={cn('flex max-w-[80%] flex-col', isUser && 'items-end')}>
        {message.files && message.files.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {message.files.map((file, index) => (
              <FilePreview key={index} file={file} />
            ))}
          </div>
        )}

        <div
          className={cn(
            'rounded-lg px-4 py-2',
            isUser
              ? 'bg-primary dark:bg-primary/60 text-primary-foreground'
              : 'bg-muted',
            message.status === 'error' && 'text-destructive'
          )}
        >
          <Markdown>{message.content}</Markdown>
        </div>
      </div>

      {isUser && (
        <div className="bg-primary dark:bg-primary/60 flex size-8 items-center justify-center rounded-full">
          <span className="text-primary-foreground text-sm">You</span>
        </div>
      )}
    </div>
  );
}

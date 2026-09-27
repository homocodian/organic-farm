'use client';

import { useEffect, useState } from 'react';

import { FileIcon, ImageIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface FilePreviewProps {
  file: File;
  small?: boolean;
}

export function FilePreview({ file, small = false }: FilePreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [file, preview]);

  const isImage = file.type.startsWith('image/');

  return (
    <div
      className={cn(
        'bg-background flex items-center overflow-hidden rounded-md border',
        small ? 'h-8 text-xs' : 'h-20'
      )}
    >
      {isImage && preview ? (
        <div
          className={cn(
            'bg-muted relative flex aspect-square h-full items-center justify-center overflow-hidden'
          )}
        >
          {/* eslint-disable-next-line */}
          <img
            src={preview || '/placeholder.svg'}
            alt={file.name}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          className={cn(
            'bg-muted flex aspect-square h-full items-center justify-center'
          )}
        >
          {isImage ? (
            <ImageIcon className={cn(small ? 'size-4' : 'size-6')} />
          ) : (
            <FileIcon className={cn(small ? 'size-4' : 'size-6')} />
          )}
        </div>
      )}

      {!small && (
        <div className="max-w-[120px] truncate p-2">
          <p className="truncate text-sm font-medium">{file.name}</p>
          <p className="text-muted-foreground text-xs">
            {(file.size / 1024).toFixed(1)} KB
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { FileIcon, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FilePreviewProps {
  file: File;
  small?: boolean;
}

export function FilePreview({ file, small = false }: FilePreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file.type.startsWith("image/")) {
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

  const isImage = file.type.startsWith("image/");

  return (
    <div
      className={cn(
        "flex items-center rounded-md border overflow-hidden bg-background",
        small ? "h-8 text-xs" : "h-20",
      )}
    >
      {isImage && preview ? (
        <div
          className={cn(
            "relative h-full aspect-square bg-muted flex items-center justify-center overflow-hidden",
          )}
        >
          <Image
            src={preview || "/placeholder.svg"}
            alt={file.name}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          className={cn(
            "h-full aspect-square bg-muted flex items-center justify-center",
          )}
        >
          {isImage ? (
            <ImageIcon className={cn(small ? "size-4" : "size-6")} />
          ) : (
            <FileIcon className={cn(small ? "size-4" : "size-6")} />
          )}
        </div>
      )}

      {!small && (
        <div className="p-2 truncate max-w-[120px]">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {(file.size / 1024).toFixed(1)} KB
          </p>
        </div>
      )}
    </div>
  );
}

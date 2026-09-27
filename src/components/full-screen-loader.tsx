import { Loader2 } from 'lucide-react';

export function FullScreenLoader() {
  return (
    <div className="flex min-h-[calc(100vh-65px)] items-center justify-center">
      <span>
        <Loader2 className="size-8 animate-spin" />
      </span>
    </div>
  );
}

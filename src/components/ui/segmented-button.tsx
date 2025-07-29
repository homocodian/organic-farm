"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SegmentedButtonProps = {
  options: { id: string; label: string }[];
  selected: string;
  setSelectedAction: (id: string) => void;
};

export default function SegmentedButton({
  options,
  selected,
  setSelectedAction,
}: SegmentedButtonProps) {
  const [buttonRects, setButtonRects] = useState<
    Record<string, { left: number; width: number }>
  >({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useLayoutEffect(() => {
    const measureButtons = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const rects: Record<string, { left: number; width: number }> = {};

      options.forEach((option) => {
        const button = buttonRefs.current[option.id];
        if (button) {
          const buttonRect = button.getBoundingClientRect();
          rects[option.id] = {
            left: buttonRect.left - containerRect.left,
            width: buttonRect.width,
          };
        }
      });

      setButtonRects(rects);
    };

    // Measure immediately
    measureButtons();

    // Also measure after a small delay to ensure everything is rendered
    const timeoutId = setTimeout(measureButtons, 0);

    // Measure on window resize
    const handleResize = () => measureButtons();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line
  }, []); // Remove selected dependency to avoid re-measuring on every selection

  const selectedRect = buttonRects[selected];

  return (
    <div>
      <div
        ref={containerRef}
        className="relative flex bg-muted rounded-lg p-1 gap-0"
      >
        {options.map((option) => (
          <button
            key={option.id}
            ref={(el) => {
              buttonRefs.current[option.id] = el;
            }}
            onClick={() => setSelectedAction(option.id)}
            className={cn(
              "relative z-10 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md whitespace-nowrap",
              selected === option.id
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        ))}

        {selectedRect && selectedRect.width > 0 && (
          <motion.div
            className="absolute bg-primary rounded-md"
            style={{
              top: 4,
              bottom: 4,
              left: selectedRect.left,
              width: selectedRect.width,
            }}
            initial={false}
            animate={{
              left: selectedRect.left,
              width: selectedRect.width,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        )}
      </div>
    </div>
  );
}

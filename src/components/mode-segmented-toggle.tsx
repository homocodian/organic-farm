"use client";

import { useTheme } from "next-themes";
import SegmentedButton from "./ui/segmented-button";
import { defaultTheme } from "@/constants/theme";

const options = [
  { id: "system", label: "System" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

export function ModeSegmentedToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <SegmentedButton
      options={options}
      selected={theme ?? defaultTheme}
      setSelectedAction={setTheme}
    />
  );
}

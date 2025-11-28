"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-1 py-0.5 rounded",
        className
      )}
    >
      {children}
    </span>
  );
};


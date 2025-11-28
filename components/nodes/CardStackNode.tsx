"use client";
import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { CardStack } from "@/components/ui/card-stack";
import { Highlight } from "@/components/ui/highlight";

export interface CardStackNodeData {
  label: string;
  cards: React.ReactNode[];
}

export const CardStackNode = ({ data }: NodeProps<CardStackNodeData>) => {
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white border-2 border-stone-200 dark:bg-neutral-900 dark:border-neutral-700">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
      />
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-semibold text-stone-700 dark:text-stone-300">
          <Highlight>{data.label}</Highlight>
        </div>
        <CardStack items={data.cards} />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
};


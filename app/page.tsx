"use client";
import React, { useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { CardStackNode, CardStackNodeData } from "@/components/nodes/CardStackNode";

const nodeTypes = {
  cardStack: CardStackNode,
};

const initialNodes: Node<CardStackNodeData>[] = [
  {
    id: "1",
    type: "cardStack",
    position: { x: 250, y: 100 },
    data: {
      label: "카드 스택 1",
      cards: [
        <div key="card1-1" className="text-center">
          <h3 className="text-xl font-bold mb-2">카드 1</h3>
          <p className="text-gray-600 dark:text-gray-400">첫 번째 카드 내용</p>
        </div>,
        <div key="card1-2" className="text-center">
          <h3 className="text-xl font-bold mb-2">카드 2</h3>
          <p className="text-gray-600 dark:text-gray-400">두 번째 카드 내용</p>
        </div>,
        <div key="card1-3" className="text-center">
          <h3 className="text-xl font-bold mb-2">카드 3</h3>
          <p className="text-gray-600 dark:text-gray-400">세 번째 카드 내용</p>
        </div>,
      ],
    },
  },
  {
    id: "2",
    type: "cardStack",
    position: { x: 600, y: 100 },
    data: {
      label: "카드 스택 2",
      cards: [
        <div key="card2-1" className="text-center">
          <h3 className="text-xl font-bold mb-2">카드 A</h3>
          <p className="text-gray-600 dark:text-gray-400">카드 A 내용</p>
        </div>,
        <div key="card2-2" className="text-center">
          <h3 className="text-xl font-bold mb-2">카드 B</h3>
          <p className="text-gray-600 dark:text-gray-400">카드 B 내용</p>
        </div>,
      ],
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
];

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-screen bg-gray-50 dark:bg-gray-900">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

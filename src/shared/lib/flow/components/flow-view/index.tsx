"use client";

import type { NodeChange, EdgeChange, ReactFlowProps } from "@xyflow/react";

import type { Flow } from "../../types/flow";
import type { FlowChange } from "../../types/flow-change";
import type { NodeEntity, EdgeEntity } from "../../types/entity";
import type { Dimensions, DimensionsChange } from "./dimensions";

import { useState, useCallback } from "react";
import { ReactFlow, Background, BackgroundVariant } from "@xyflow/react";

import { useNodesEdges } from "./use-nodes-edges";

import { nodeChangesToFlowChanges } from "./flow-changes/node";
import { edgeChangesToFlowChanges } from "./flow-changes/edge";

import {
  nodeChangesToDimensionsChanges,
  applyDimensionsChanges,
} from "./dimensions";

import { constants } from "@/constants";

interface FlowViewProps<T extends NodeEntity, U extends EdgeEntity>
  extends ReactFlowProps {
  flow: Flow<T, U>;
  onFlowChange: (changes: FlowChange<T, U>[]) => void;
}

export function FlowView<T extends NodeEntity, U extends EdgeEntity>({
  flow,
  onFlowChange,
  nodeTypes,
  edgeTypes,
  children,
  ...props
}: FlowViewProps<T, U>) {
  const [dimensions, setDimensions] = useState<Dimensions>({});
  const [nodes, edges] = useNodesEdges(flow, dimensions);

  const onDimensionsChange = useCallback((changes: DimensionsChange[]) => {
    setDimensions((dimensions) => applyDimensionsChanges(changes, dimensions));
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const flowChanges = nodeChangesToFlowChanges(changes, flow);
      const dimensionsChanges = nodeChangesToDimensionsChanges(changes);
      if (flowChanges.length) onFlowChange(flowChanges);
      if (dimensionsChanges.length) onDimensionsChange(dimensionsChanges);
    },
    [flow, onFlowChange, onDimensionsChange],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const flowChanges = edgeChangesToFlowChanges(changes, flow);
      if (flowChanges.length) onFlowChange(flowChanges);
    },
    [flow, onFlowChange],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView={true}
      maxZoom={constants.flow.config.maxZoom}
      minZoom={constants.flow.config.minZoom}
      panOnScroll={true}
      selectionKeyCode={null}
      multiSelectionKeyCode={null}
      nodesConnectable={false}
      proOptions={{
        hideAttribution: true,
      }}
      {...props}
    >
      {children}
      <Background
        color="var(--color-neutral-700)"
        variant={BackgroundVariant.Dots}
      />
    </ReactFlow>
  );
}

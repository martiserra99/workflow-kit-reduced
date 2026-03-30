"use client";

import type { NodeChange, EdgeChange, ReactFlowProps } from "@xyflow/react";

import type { Flows } from "../../types/flows";
import type { FlowsChange } from "../../types/flows-change";
import type { NodeEntity, EdgeEntity } from "../../types/entity";
import type { Dimensions, DimensionsChange } from "./dimensions";

import { useState, useCallback } from "react";
import { ReactFlow, Background, BackgroundVariant } from "@xyflow/react";

import { useNodesEdges } from "./use-nodes-edges";

import { nodeChangesToFlowsChanges } from "./flows-changes/node";
import { edgeChangesToFlowsChanges } from "./flows-changes/edge";

import {
  nodeChangesToDimensionsChanges,
  applyDimensionsChanges,
} from "./dimensions";

import { constants } from "@/constants";

interface FlowsViewProps<T extends NodeEntity, U extends EdgeEntity>
  extends ReactFlowProps {
  flows: Flows<T, U>;
  onFlowsChange: (changes: FlowsChange<T, U>[]) => void;
}

export function FlowsView<T extends NodeEntity, U extends EdgeEntity>({
  flows,
  onFlowsChange,
  nodeTypes,
  edgeTypes,
  children,
  ...props
}: FlowsViewProps<T, U>) {
  const [dimensions, setDimensions] = useState<Dimensions>({});
  const [nodes, edges] = useNodesEdges(flows, dimensions);

  const onDimensionsChange = useCallback((changes: DimensionsChange[]) => {
    setDimensions((dimensions) => applyDimensionsChanges(changes, dimensions));
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const flowChanges = nodeChangesToFlowsChanges(changes, flows);
      const dimensionsChanges = nodeChangesToDimensionsChanges(changes);
      if (flowChanges.length) onFlowsChange(flowChanges);
      if (dimensionsChanges.length) onDimensionsChange(dimensionsChanges);
    },
    [flows, onFlowsChange, onDimensionsChange],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const flowChanges = edgeChangesToFlowsChanges(changes, flows);
      if (flowChanges.length) onFlowsChange(flowChanges);
    },
    [flows, onFlowsChange],
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
      maxZoom={constants.flows.config.maxZoom}
      minZoom={constants.flows.config.minZoom}
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

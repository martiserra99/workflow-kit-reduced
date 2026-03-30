import type { Node, Edge } from "@xyflow/react";

import type {
  Flows,
  FlowNode,
  FlowEdge,
  FlowComponent,
  FlowContainer,
} from "../../types/flows";

import type { NodeEntity, EdgeEntity } from "../../types/entity";
import type { Dimensions } from "./dimensions";

import { useMemo } from "react";

export function useNodesEdges<T extends NodeEntity, U extends EdgeEntity>(
  flows: Flows<T, U>,
  dimensions: Dimensions,
): [Node[], Edge[]] {
  return useMemo(
    () => toNodesEdges<T, U>(flows, dimensions),
    [flows, dimensions],
  );
}

function toNodesEdges<T extends NodeEntity, U extends EdgeEntity>(
  flows: Flows<T, U>,
  dimensions: Dimensions,
): [Node[], Edge[]] {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  insertNodesEdges(flows, dimensions, nodes, edges);
  return [nodes, edges];
}

function insertNodesEdges(
  flows: Flows<NodeEntity, EdgeEntity>,
  dimensions: Dimensions,
  nodes: Node[],
  edges: Edge[],
) {
  for (const root of flows.roots) {
    insertFlowNodesEdges(root, dimensions, nodes, edges);
  }
}

interface Item<T extends NodeEntity, U extends EdgeEntity> {
  edge: FlowEdge<T, U>;
  node: FlowNode<T, U>;
}

function insertFlowNodesEdges<T extends NodeEntity, U extends EdgeEntity>(
  root: FlowNode<T, U>,
  dimensions: Dimensions,
  nodes: Node[],
  edges: Edge[],
) {
  const stack: Item<T, U>[] = [];
  const visited = new Set<string>();
  insertNode(root, dimensions, nodes, edges);
  insertStack(stack, root);
  while (stack.length > 0) {
    const { edge, node } = stack.pop() as Item<T, U>;
    if (visited.has(node.id)) {
      insertEdge(edge, edges);
    } else {
      insertEdge(edge, edges);
      insertNode(node, dimensions, nodes, edges);
      visited.add(node.id);
      insertStack(stack, node);
    }
  }
}

function insertStack<T extends NodeEntity, U extends EdgeEntity>(
  stack: Item<T, U>[],
  node: FlowNode<T, U>,
) {
  for (let i = node.next.length - 1; i >= 0; i--) {
    stack.push({
      edge: node.next[i]!.edge,
      node: node.next[i]!.node,
    });
  }
}

function insertNode<T extends NodeEntity, U extends EdgeEntity>(
  flowNode: FlowNode<T, U>,
  dimensions: Dimensions,
  nodes: Node[],
  edges: Edge[],
) {
  switch (flowNode.type) {
    case "component":
      insertComponentNode(flowNode, dimensions, nodes);
      break;
    case "container":
      insertContainerNode(flowNode, dimensions, nodes, edges);
      break;
  }
}

function insertComponentNode<T extends NodeEntity, U extends EdgeEntity>(
  flowNode: FlowComponent<T, U>,
  dimensions: Dimensions,
  nodes: Node[],
) {
  nodes.push({
    id: flowNode.id,
    type: flowNode.entity.type,
    data: flowNode.entity.data,
    position: flowNode.position,
    selected: flowNode.selected,
    parentId: flowNode.parent?.id,
    measured: dimensions[flowNode.id],
  });
}

function insertContainerNode<T extends NodeEntity, U extends EdgeEntity>(
  flowNode: FlowContainer<T, U>,
  dimensions: Dimensions,
  nodes: Node[],
  edges: Edge[],
) {
  nodes.push({
    id: flowNode.id,
    type: flowNode.entity.type,
    data: { ...flowNode.entity.data, size: flowNode.size },
    position: flowNode.position,
    selected: flowNode.selected,
    parentId: flowNode.parent?.id,
    measured: dimensions[flowNode.id],
    selectable: false,
    draggable: false,
  });
  for (const root of flowNode.into) {
    insertFlowNodesEdges(root, dimensions, nodes, edges);
  }
}

function insertEdge<T extends NodeEntity, U extends EdgeEntity>(
  flowEdge: FlowEdge<T, U>,
  edges: Edge[],
) {
  edges.push({
    id: flowEdge.id,
    type: flowEdge.entity.type,
    data: flowEdge.entity.data,
    source: flowEdge.source.id,
    target: flowEdge.target.id,
  });
}

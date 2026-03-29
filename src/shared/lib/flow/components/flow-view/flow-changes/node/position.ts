import type { NodePositionChange } from "@xyflow/react";

import type { Flow, FlowNode } from "@/shared/lib/flow/types/flow";
import type { FlowChange } from "@/shared/lib/flow/types/flow-change";
import type { NodeEntity, EdgeEntity } from "@/shared/lib/flow/types/entity";

import type {
  NodeDragChange,
  NodeDropChange,
} from "@/shared/lib/flow/types/flow-change";

export function position<T extends NodeEntity, U extends EdgeEntity>(
  change: NodePositionChange,
  flow: Flow<T, U>,
): FlowChange<T, U>[] {
  const node = flow.nodes.get(change.id)!;
  if (change.dragging) {
    const dragChange: NodeDragChange<T, U> = {
      type: "drag",
      node: node,
      position: change.position!,
      positionAbsolute: positionAbsolute(node, change.position!),
    };
    return [dragChange];
  }
  const dropChange: NodeDropChange<T, U> = {
    type: "drop",
    node: node,
  };
  return [dropChange];
}

function positionAbsolute<T extends NodeEntity, U extends EdgeEntity>(
  node: FlowNode<T, U>,
  position: { x: number; y: number },
): {
  x: number;
  y: number;
} {
  let x = position.x;
  let y = position.y;
  let current = node;
  while (current.parent) {
    x += current.parent.position.x;
    y += current.parent.position.y;
    current = current.parent;
  }
  return { x, y };
}

import type { FlowNode, FlowEdge } from "../types/flows";
import type { NodeEntity, EdgeEntity } from "../types/entity";

/**
 * Connects a sequence of nodes by creating edges between them.
 *
 * Each item in the `nodes` array can be:
 * - A single node, or
 * - A tuple [top, bottom], representing a start and end node.
 *
 * The function connects the bottom of the previous item to the top of the current one
 * using the provided `createEdge` function. It updates the `next` and `prev` references
 * of the involved nodes accordingly.
 *
 * @param nodes List of nodes or [top, bottom] node pairs to connect in order.
 * @param createEdge Function that creates and returns an edge.
 * @returns A tuple with the first top node and the last bottom node.
 */
export function connect<T extends NodeEntity, U extends EdgeEntity>(
  nodes: (FlowNode<T, U> | [FlowNode<T, U>, FlowNode<T, U>])[],
  createEdge: (top: FlowNode<T, U>, bottom: FlowNode<T, U>) => FlowEdge<T, U>,
): [FlowNode<T, U>, FlowNode<T, U>] {
  if (nodes.length === 0) throw new Error("No nodes to connect");
  let current = getBottom(nodes[0]!);
  for (let i = 1; i < nodes.length; i++) {
    const node = getTop(nodes[i]!);
    const edge = createEdge(current, node);
    current.next.push({ edge: edge, node: node });
    node.prev.push({ edge: edge, node: current });
    current = getBottom(nodes[i]!);
  }
  return [getTop(nodes[0]!), current];
}

function getTop<T extends NodeEntity, U extends EdgeEntity>(
  item: FlowNode<T, U> | [FlowNode<T, U>, FlowNode<T, U>],
) {
  if (Array.isArray(item)) return item[0];
  return item;
}

function getBottom<T extends NodeEntity, U extends EdgeEntity>(
  item: FlowNode<T, U> | [FlowNode<T, U>, FlowNode<T, U>],
) {
  if (Array.isArray(item)) return item[1];
  return item;
}

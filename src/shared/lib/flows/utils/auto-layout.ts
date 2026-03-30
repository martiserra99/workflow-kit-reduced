import type { NodeEntity, EdgeEntity } from "@/shared/lib/flows/types/entity";
import type { FlowNode, FlowEdge } from "@/shared/lib/flows/types/flows";

interface DimensionsFlow {
  flow: {
    h: number;
    l: number;
    r: number;
  };
  forks: Record<string, DimensionsFork>;
}

interface DimensionsFork {
  fork: {
    h: number;
    l: number;
    r: number;
  };
  flows: Record<string, DimensionsFlow>;
}

interface Position {
  x: number;
  y: number;
}

interface Size {
  w: number;
  h: number;
}

/**
 * Automatically sets the position of each node in the flow, starting from the root.
 * The root node keeps its original position, and all other nodes are positioned relative to it.
 * Also updates the size of container nodes based on their children.
 *
 * For a deeper understanding of the algorithm, see:
 * https://www.martiserra.me/projects/formity/the-node-layout-algorithm-behind-formity-ui
 */
export function autoLayout<T extends NodeEntity, U extends EdgeEntity>(
  root: FlowNode<T, U>,
) {
  setContainerNodes(root);
  const dimensions = getDimensionsFlow(root);
  setPositions(root, dimensions, {
    x: root.position.x - (dimensions.flow.l - root.size.w / 2),
    y: root.position.y,
  });
  setPositionsAbsolute(root);
}

function setContainerNodes<T extends NodeEntity, U extends EdgeEntity>(
  node: FlowNode<T, U>,
) {
  const stack: FlowNode<T, U>[] = [node];
  const visited: Set<FlowNode<T, U>> = new Set();
  while (stack.length > 0) {
    const node = stack.pop() as FlowNode<T, U>;
    if (visited.has(node)) {
      continue;
    }
    if (node.type === "container") {
      const position = { x: node.room.x, y: node.room.y };
      const { w, h } = setIntoList(node.into, position, node.gaps.into);
      node.size.w = w + node.room.x * 2;
      node.size.h = h + node.room.y * 2;
    }
    for (let i = node.next.length - 1; i >= 0; i--) {
      stack.push(node.next[i]!.node);
    }
    visited.add(node);
  }
}

function setIntoList<T extends NodeEntity, U extends EdgeEntity>(
  list: FlowNode<T, U>[],
  position: Position,
  distance: number,
): Size {
  let x: number = position.x;
  let h: number = 0;
  for (let i = 0; i < list.length; i++) {
    const size = setIntoItem(list[i]!, { x, y: position.y });
    h = Math.max(h, size.h);
    x = x + size.w;
    if (i < list.length - 1) {
      x = x + distance;
    }
  }
  return { w: x - position.x, h: h };
}

function setIntoItem<T extends NodeEntity, U extends EdgeEntity>(
  root: FlowNode<T, U>,
  position: Position,
) {
  setContainerNodes(root);
  const dimensions = getDimensionsFlow(root);
  setPositions(root, dimensions, position);
  return {
    w: dimensions.flow.l + dimensions.flow.r,
    h: dimensions.flow.h,
  };
}

function getDimensionsFlow<T extends NodeEntity, U extends EdgeEntity>(
  node: FlowNode<T, U>,
): DimensionsFlow {
  let h: number = 0;
  let l: number = 0;
  let r: number = 0;
  let current: FlowNode<T, U> = node;
  const stack: FlowNode<T, U>[] = [];
  const forks: Record<string, DimensionsFork> = {};
  while (true) {
    if (current.prev.length > 1) {
      const node = stack.pop() as FlowNode<T, U>;
      if (stack.length === 0) {
        removeConnections(node, current);
        forks[node.id] = getDimensionsFork(node);
        insertConnections(node, current);
        const fork = forks[node.id]!.fork;
        h = h + fork.h + getDistanceConnections(node.next);
        l = Math.max(l, fork.l);
        r = Math.max(r, fork.r);
      }
    }
    if (stack.length === 0) {
      const size = {
        w: current.size.w,
        h: current.size.h,
      };
      h = h + size.h + getDistanceConnections(current.prev);
      l = Math.max(l, size.w / 2);
      r = Math.max(r, size.w / 2);
    }
    if (current.next.length > 1) {
      stack.push(current);
    }
    if (current.next.length > 0) {
      current = current.next[0]!.node;
    } else {
      break;
    }
  }
  return {
    flow: { h, l, r },
    forks,
  };
}

function getDimensionsFork<T extends NodeEntity, U extends EdgeEntity>(
  node: FlowNode<T, U>,
): DimensionsFork {
  const flows: Record<string, DimensionsFlow> = {};
  let h: number = 0;
  let w: number = 0;
  let s: number = 0;
  let e: number = 0;
  for (let i = 0; i < node.next.length; i++) {
    flows[node.next[i]!.node.id] = getDimensionsFlow(node.next[i]!.node);
    const flow = flows[node.next[i]!.node.id]!.flow;
    h = Math.max(h, flow.h);
    w = w + flow.l + flow.r;
    if (i < node.next.length - 1) {
      w = w + node.gaps.next;
    }
    if (i === 0) {
      s = flow.l;
    }
    if (i === node.next.length - 1) {
      e = w - flow.r;
    }
  }
  const l = (s + e) / 2;
  const r = w - l;
  return {
    fork: { h, l, r },
    flows,
  };
}

function setPositions<T extends NodeEntity, U extends EdgeEntity>(
  node: FlowNode<T, U>,
  dimensions: DimensionsFlow,
  position: Position,
) {
  let t: number = position.y;
  let current: FlowNode<T, U> = node;
  const stack: FlowNode<T, U>[] = [];
  while (true) {
    if (current.prev.length > 1) {
      const node = stack.pop() as FlowNode<T, U>;
      if (stack.length === 0) {
        removeConnections(node, current);
        const fork = dimensions.forks[node.id]!;
        const y = t + getDistanceConnections(node.next);
        let x = position.x + dimensions.flow.l - fork.fork.l;
        for (let i = 0; i < node.next.length; i++) {
          const flow: DimensionsFlow = fork.flows[node.next[i]!.node.id]!;
          const position: Position = { x, y };
          setPositions(node.next[i]!.node, flow, position);
          x += flow.flow.l + flow.flow.r + node.gaps.next;
        }
        t = y + fork.fork.h;
        insertConnections(node, current);
      }
    }
    if (stack.length === 0) {
      const w = current.size.w;
      const y = t + getDistanceConnections(current.prev);
      const x = position.x + dimensions.flow.l - w / 2;
      current.position.x = x;
      current.position.y = y;
      t = y + current.size.h;
    }
    if (current.next.length > 1) {
      stack.push(current);
    }
    if (current.next.length > 0) {
      current = current.next[0]!.node;
    } else {
      break;
    }
  }
}

function setPositionsAbsolute<T extends NodeEntity, U extends EdgeEntity>(
  node: FlowNode<T, U>,
) {
  const stack: FlowNode<T, U>[] = [node];
  const visited: Set<string> = new Set<string>();
  while (stack.length > 0) {
    const current = stack.pop() as FlowNode<T, U>;
    if (visited.has(current.id)) {
      continue;
    }
    for (let i = current.next.length - 1; i >= 0; i--) {
      stack.push(current.next[i]!.node);
    }
    if (current.type === "container") {
      for (let i = current.into.length - 1; i >= 0; i--) {
        stack.push(current.into[i]!);
      }
    }
    setPositionAbsolute(current);
    visited.add(current.id);
  }
}

function setPositionAbsolute<T extends NodeEntity, U extends EdgeEntity>(
  node: FlowNode<T, U>,
) {
  if (node.parent) {
    node.positionAbsolute.x = node.position.x + node.parent.positionAbsolute.x;
    node.positionAbsolute.y = node.position.y + node.parent.positionAbsolute.y;
  } else {
    node.positionAbsolute.x = node.position.x;
    node.positionAbsolute.y = node.position.y;
  }
}

function removeConnections<T extends NodeEntity, U extends EdgeEntity>(
  t: FlowNode<T, U>,
  b: FlowNode<T, U>,
): void {
  for (const { node } of t.next) node.prev.pop();
  for (const { node } of b.prev) node.next.pop();
}

function insertConnections<T extends NodeEntity, U extends EdgeEntity>(
  t: FlowNode<T, U>,
  b: FlowNode<T, U>,
): void {
  for (const { node, edge } of t.next) node.prev.push({ node: t, edge });
  for (const { node, edge } of b.prev) node.next.push({ node: b, edge });
}

function getDistanceConnections<T extends NodeEntity, U extends EdgeEntity>(
  connections: { edge: FlowEdge<T, U> }[],
): number {
  let maxLength = 0;
  for (const { edge } of connections) {
    maxLength = Math.max(maxLength, edge.length);
  }
  return maxLength;
}

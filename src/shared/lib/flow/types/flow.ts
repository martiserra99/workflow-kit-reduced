import type { NodeEntity, EdgeEntity } from "./entity";

export interface Flow<T extends NodeEntity, U extends EdgeEntity> {
  roots: FlowNode<T, U>[];
  nodes: Map<string, FlowNode<T, U>>;
}

export type FlowNode<T extends NodeEntity, U extends EdgeEntity> =
  | FlowComponent<T, U>
  | FlowContainer<T, U>;

export interface FlowComponent<T extends NodeEntity, U extends EdgeEntity> {
  id: string;
  type: "component";
  entity: T;
  selected: boolean;
  position: {
    x: number; // X coordinate relative to the parent container or flow.
    y: number; // Y coordinate relative to the parent container or flow.
  };
  positionAbsolute: {
    x: number; // X coordinate relative to the flow (global position).
    y: number; // Y coordinate relative to the flow (global position).
  };
  size: {
    w: number; // Width of the node.
    h: number; // Height of the node.
  };
  gaps: {
    next: number; // Horizontal gap between each node in the 'next' list.
  };
  next: {
    edge: FlowEdge<T, U>;
    node: FlowNode<T, U>;
  }[];
  prev: {
    edge: FlowEdge<T, U>;
    node: FlowNode<T, U>;
  }[];
  parent: FlowContainer<T, U> | null; // Parent container node, or null if not inside a container.
}

export interface FlowContainer<T extends NodeEntity, U extends EdgeEntity> {
  id: string;
  type: "container";
  entity: T;
  selected: boolean;
  position: {
    x: number; // X coordinate relative to the parent container or flow.
    y: number; // Y coordinate relative to the parent container or flow.
  };
  positionAbsolute: {
    x: number; // X coordinate relative to the flow (global position).
    y: number; // Y coordinate relative to the flow (global position).
  };
  size: {
    w: number; // Width of the container.
    h: number; // Height of the container.
  };
  room: {
    x: number; // Horizontal padding (left and right).
    y: number; // Vertical padding (top and bottom).
  };
  gaps: {
    into: number; // Horizontal gap between each node in the 'into' list.
    next: number; // Horizontal gap between each node in the 'next' list.
  };
  into: FlowNode<T, U>[];
  next: {
    edge: FlowEdge<T, U>;
    node: FlowNode<T, U>;
  }[];
  prev: {
    edge: FlowEdge<T, U>;
    node: FlowNode<T, U>;
  }[];
  parent: FlowContainer<T, U> | null; // Parent container node, or null if not inside a container.
}

export interface FlowEdge<T extends NodeEntity, U extends EdgeEntity> {
  id: string;
  entity: U;
  length: number;
  source: FlowNode<T, U>;
  target: FlowNode<T, U>;
}

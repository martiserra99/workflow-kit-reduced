import type { NodeEntity, EdgeEntity } from "./entity";

import type { FlowNode } from "./flows";

export type FlowsChange<T extends NodeEntity, U extends EdgeEntity> =
  | NodeSelectChange<T, U>
  | NodeDragChange<T, U>
  | NodeDropChange<T, U>;

export interface NodeSelectChange<T extends NodeEntity, U extends EdgeEntity> {
  type: "select";
  node: FlowNode<T, U>;
  selected: boolean;
}

export interface NodeDragChange<T extends NodeEntity, U extends EdgeEntity> {
  type: "drag";
  node: FlowNode<T, U>;
  position: {
    x: number;
    y: number;
  };
  positionAbsolute: {
    x: number;
    y: number;
  };
}

export interface NodeDropChange<T extends NodeEntity, U extends EdgeEntity> {
  type: "drop";
  node: FlowNode<T, U>;
}

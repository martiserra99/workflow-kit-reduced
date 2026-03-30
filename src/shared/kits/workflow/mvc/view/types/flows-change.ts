import type {
  FlowsChange,
  NodeSelectChange,
  NodeDragChange,
  NodeDropChange,
} from "@/shared/lib/flows";

import type { NodeEntity, EdgeEntity } from "../entities";

export type TypedFlowsChange = FlowsChange<NodeEntity, EdgeEntity>;
export type TypedNodeSelectChange = NodeSelectChange<NodeEntity, EdgeEntity>;
export type TypedNodeDragChange = NodeDragChange<NodeEntity, EdgeEntity>;
export type TypedNodeDropChange = NodeDropChange<NodeEntity, EdgeEntity>;

import type {
  FlowChange,
  NodeSelectChange,
  NodeDragChange,
  NodeDropChange,
} from "@/shared/lib/flow";

import type { NodeEntity, EdgeEntity } from "../entities";

export type TypedFlowChange = FlowChange<NodeEntity, EdgeEntity>;
export type TypedNodeSelectChange = NodeSelectChange<NodeEntity, EdgeEntity>;
export type TypedNodeDragChange = NodeDragChange<NodeEntity, EdgeEntity>;
export type TypedNodeDropChange = NodeDropChange<NodeEntity, EdgeEntity>;

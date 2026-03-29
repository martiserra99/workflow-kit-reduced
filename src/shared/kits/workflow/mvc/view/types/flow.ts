import type {
  Flow,
  FlowNode,
  FlowEdge,
  FlowComponent,
  FlowContainer,
} from "@/shared/lib/flow";

import type { NodeEntity, EdgeEntity } from "../entities";

export type TypedFlow = Flow<NodeEntity, EdgeEntity>;
export type TypedFlowNode = FlowNode<NodeEntity, EdgeEntity>;
export type TypedFlowEdge = FlowEdge<NodeEntity, EdgeEntity>;
export type TypedFlowComponent = FlowComponent<NodeEntity, EdgeEntity>;
export type TypedFlowContainer = FlowContainer<NodeEntity, EdgeEntity>;

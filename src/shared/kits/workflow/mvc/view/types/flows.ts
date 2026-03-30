import type {
  Flows,
  FlowNode,
  FlowEdge,
  FlowComponent,
  FlowContainer,
} from "@/shared/lib/flows";

import type { NodeEntity, EdgeEntity } from "../entities";

export type TypedFlows = Flows<NodeEntity, EdgeEntity>;
export type TypedFlowNode = FlowNode<NodeEntity, EdgeEntity>;
export type TypedFlowEdge = FlowEdge<NodeEntity, EdgeEntity>;
export type TypedFlowComponent = FlowComponent<NodeEntity, EdgeEntity>;
export type TypedFlowContainer = FlowContainer<NodeEntity, EdgeEntity>;

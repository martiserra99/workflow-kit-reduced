import type { TypedFlowNode, TypedFlowContainer } from "../types/flow";

import type { OnWorkflowChange } from "@/shared/kits/workflow/mvc/model/on-workflow-change";

export interface Options {
  active: string | null;
  map: Map<string, TypedFlowNode>;
  parent: TypedFlowContainer | null;
  onWorkflowChange: OnWorkflowChange;
}

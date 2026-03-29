import { zet, type Refine } from "@/shared/lib/zet";

import type { Workflow } from "@/shared/kits/workflow/mvc/model/workflow";
import type { WorkflowChange } from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { TypedFlowChange } from "@/shared/kits/workflow/mvc/view/types/flow-change";
import type { TypedFlow } from "@/shared/kits/workflow/mvc/view/types/flow";

import { globalChangeToWorkflowChanges } from "./global";
import { elementTypeChangeToWorkflowChanges } from "./element-type";

export function toWorkflowChanges(
  changes: TypedFlowChange[],
  workflow: Workflow,
  flow: TypedFlow,
): WorkflowChange[] {
  return changes.flatMap((change) => {
    return flowChangeToWorkflowChanges(change, workflow, flow);
  });
}

interface Zet {
  object: TypedFlowChange;
  nested: ["node", "entity"];
  filter: ["meta", "type"];
  params: [Workflow, TypedFlow];
  return: WorkflowChange[];
}

const dispatch = zet<Zet>(["node", "entity"], ["meta", "type"], {
  global: globalChangeToWorkflowChanges,
  elementType: elementTypeChangeToWorkflowChanges,
});

export function flowChangeToWorkflowChanges(
  change: TypedFlowChange,
  workflow: Workflow,
  flow: TypedFlow,
): WorkflowChange[] {
  return dispatch(change, workflow, flow);
}

export type GlobalChange = Refine<{
  object: TypedFlowChange;
  nested: ["node", "entity"];
  filter: ["meta", "type"];
  narrow: "global";
}>;

export type ElementTypeChange = Refine<{
  object: TypedFlowChange;
  nested: ["node", "entity"];
  filter: ["meta", "type"];
  narrow: "elementType";
}>;

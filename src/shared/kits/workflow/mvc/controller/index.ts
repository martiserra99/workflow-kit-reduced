import { zet, type Refine } from "@/shared/lib/zet";

import type { Workflow } from "@/shared/kits/workflow/mvc/model/workflow";
import type { WorkflowChange } from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { TypedFlowsChange } from "@/shared/kits/workflow/mvc/view/types/flows-change";
import type { TypedFlows } from "@/shared/kits/workflow/mvc/view/types/flows";

import { globalChangeToWorkflowChanges } from "./global";
import { elementTypeChangeToWorkflowChanges } from "./element-type";

export function toWorkflowChanges(
  changes: TypedFlowsChange[],
  workflow: Workflow,
  flows: TypedFlows,
): WorkflowChange[] {
  return changes.flatMap((change) => {
    return flowChangeToWorkflowChanges(change, workflow, flows);
  });
}

interface Zet {
  object: TypedFlowsChange;
  nested: ["node", "entity"];
  filter: ["meta", "type"];
  params: [Workflow, TypedFlows];
  return: WorkflowChange[];
}

const dispatch = zet<Zet>(["node", "entity"], ["meta", "type"], {
  global: globalChangeToWorkflowChanges,
  elementType: elementTypeChangeToWorkflowChanges,
});

export function flowChangeToWorkflowChanges(
  change: TypedFlowsChange,
  workflow: Workflow,
  flows: TypedFlows,
): WorkflowChange[] {
  return dispatch(change, workflow, flows);
}

export type GlobalChange = Refine<{
  object: TypedFlowsChange;
  nested: ["node", "entity"];
  filter: ["meta", "type"];
  narrow: "global";
}>;

export type ElementTypeChange = Refine<{
  object: TypedFlowsChange;
  nested: ["node", "entity"];
  filter: ["meta", "type"];
  narrow: "elementType";
}>;

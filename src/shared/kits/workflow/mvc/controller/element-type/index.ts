import { zet, type Refine } from "@/shared/lib/zet";

import type { Workflow } from "@/shared/kits/workflow/mvc/model/workflow";
import type { WorkflowChange } from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { TypedFlow } from "@/shared/kits/workflow/mvc/view/types/flow";

import type { ElementTypeChange } from "..";

import { actionChangeToWorkflowChanges } from "./action";
import { conditionChangeToWorkflowChanges } from "./condition";

interface Zet {
  object: ElementTypeChange;
  nested: ["node", "entity"];
  filter: ["meta", "elementType"];
  params: [Workflow, TypedFlow];
  return: WorkflowChange[];
}

const dispatch = zet<Zet>(["node", "entity"], ["meta", "elementType"], {
  action: actionChangeToWorkflowChanges,
  condition: conditionChangeToWorkflowChanges,
});

export function elementTypeChangeToWorkflowChanges(
  change: ElementTypeChange,
  workflow: Workflow,
  flow: TypedFlow,
): WorkflowChange[] {
  return dispatch(change, workflow, flow);
}

export type ActionChange = Refine<{
  object: ElementTypeChange;
  nested: ["node", "entity"];
  filter: ["meta", "elementType"];
  narrow: "action";
}>;

export type ConditionChange = Refine<{
  object: ElementTypeChange;
  nested: ["node", "entity"];
  filter: ["meta", "elementType"];
  narrow: "condition";
}>;

import { zet, type Refine } from "@/shared/lib/zet";

import type { Workflow } from "@/shared/kits/workflow/mvc/model/workflow";
import type { WorkflowChange } from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { TypedFlows } from "@/shared/kits/workflow/mvc/view/types/flows";

import type { ActionChange } from "..";

import { blockChangeToWorkflowChanges } from "./block";
import { addNextChangeToWorkflowChanges } from "./add-next";

interface Zet {
  object: ActionChange;
  nested: ["node", "entity"];
  filter: ["meta", "item"];
  params: [Workflow, TypedFlows];
  return: WorkflowChange[];
}

const dispatch = zet<Zet>(["node", "entity"], ["meta", "item"], {
  block: blockChangeToWorkflowChanges,
  addNext: addNextChangeToWorkflowChanges,
});

export function actionChangeToWorkflowChanges(
  change: ActionChange,
  workflow: Workflow,
  flows: TypedFlows,
): WorkflowChange[] {
  return dispatch(change, workflow, flows);
}

export type BlockChange = Refine<{
  object: ActionChange;
  nested: ["node", "entity"];
  filter: ["meta", "item"];
  narrow: "block";
}>;

export type AddNextChange = Refine<{
  object: ActionChange;
  nested: ["node", "entity"];
  filter: ["meta", "item"];
  narrow: "addNext";
}>;

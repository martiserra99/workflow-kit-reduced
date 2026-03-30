import { zet, type Refine } from "@/shared/lib/zet";

import type { Workflow } from "@/shared/kits/workflow/mvc/model/workflow";
import type { WorkflowChange } from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { TypedFlows } from "@/shared/kits/workflow/mvc/view/types/flows";

import type { GlobalChange } from "..";

import { startChangeToWorkflowChanges } from "./start";
import { endChangeToWorkflowChanges } from "./end";
import { addTopChangeToWorkflowChanges } from "./add-top";

interface Zet {
  object: GlobalChange;
  nested: ["node", "entity"];
  filter: ["meta", "item"];
  params: [Workflow, TypedFlows];
  return: WorkflowChange[];
}

const dispatch = zet<Zet>(["node", "entity"], ["meta", "item"], {
  start: startChangeToWorkflowChanges,
  end: endChangeToWorkflowChanges,
  addTop: addTopChangeToWorkflowChanges,
});

export function globalChangeToWorkflowChanges(
  change: GlobalChange,
  workflow: Workflow,
  flows: TypedFlows,
): WorkflowChange[] {
  return dispatch(change, workflow, flows);
}

export type StartChange = Refine<{
  object: GlobalChange;
  nested: ["node", "entity"];
  filter: ["meta", "item"];
  narrow: "start";
}>;

export type EndChange = Refine<{
  object: GlobalChange;
  nested: ["node", "entity"];
  filter: ["meta", "item"];
  narrow: "end";
}>;

export type AddTopChange = Refine<{
  object: GlobalChange;
  nested: ["node", "entity"];
  filter: ["meta", "item"];
  narrow: "addTop";
}>;

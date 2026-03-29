import { zet, type Refine } from "@/shared/lib/zet";

import type { Workflow } from "@/shared/kits/workflow/mvc/model/workflow";
import type { WorkflowChange } from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { TypedFlow } from "@/shared/kits/workflow/mvc/view/types/flow";

import type { GlobalChange } from "..";

import { startChangeToWorkflowChanges } from "./start";
import { endChangeToWorkflowChanges } from "./end";
import { addTopChangeToWorkflowChanges } from "./add-top";

interface Zet {
  object: GlobalChange;
  nested: ["node", "entity"];
  filter: ["meta", "item"];
  params: [Workflow, TypedFlow];
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
  flow: TypedFlow,
): WorkflowChange[] {
  return dispatch(change, workflow, flow);
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

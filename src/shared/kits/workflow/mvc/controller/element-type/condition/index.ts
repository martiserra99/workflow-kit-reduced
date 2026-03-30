import { zet, type Refine } from "@/shared/lib/zet";

import type { Workflow } from "@/shared/kits/workflow/mvc/model/workflow";
import type { WorkflowChange } from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { TypedFlows } from "@/shared/kits/workflow/mvc/view/types/flows";

import type { ConditionChange } from "..";

import { blockChangeToWorkflowChanges } from "./block";
import { addNextChangeToWorkflowChanges } from "./add-next";
import { addThenChangeToWorkflowChanges } from "./add-then";
import { addElseChangeToWorkflowChanges } from "./add-else";

interface Zet {
  object: ConditionChange;
  nested: ["node", "entity"];
  filter: ["meta", "item"];
  params: [Workflow, TypedFlows];
  return: WorkflowChange[];
}

const dispatch = zet<Zet>(["node", "entity"], ["meta", "item"], {
  block: blockChangeToWorkflowChanges,
  addNext: addNextChangeToWorkflowChanges,
  addThen: addThenChangeToWorkflowChanges,
  addElse: addElseChangeToWorkflowChanges,
  labelThen: () => [],
  labelElse: () => [],
});

export function conditionChangeToWorkflowChanges(
  change: ConditionChange,
  workflow: Workflow,
  flows: TypedFlows,
): WorkflowChange[] {
  return dispatch(change, workflow, flows);
}

export type BlockChange = Refine<{
  object: ConditionChange;
  nested: ["node", "entity"];
  filter: ["meta", "item"];
  narrow: "block";
}>;

export type AddNextChange = Refine<{
  object: ConditionChange;
  nested: ["node", "entity"];
  filter: ["meta", "item"];
  narrow: "addNext";
}>;

export type AddThenChange = Refine<{
  object: ConditionChange;
  nested: ["node", "entity"];
  filter: ["meta", "item"];
  narrow: "addThen";
}>;

export type AddElseChange = Refine<{
  object: ConditionChange;
  nested: ["node", "entity"];
  filter: ["meta", "item"];
  narrow: "addElse";
}>;

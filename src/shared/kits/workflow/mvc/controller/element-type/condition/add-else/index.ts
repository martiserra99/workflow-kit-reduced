import { zet, type Refine } from "@/shared/lib/zet";

import type { Workflow } from "@/shared/kits/workflow/mvc/model/workflow";
import type { WorkflowChange } from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { TypedFlow } from "@/shared/kits/workflow/mvc/view/types/flow";

import type { AddElseChange } from "..";

import { selectChangeToWorkflowChanges } from "./select";

interface Zet {
  object: AddElseChange;
  nested: [];
  filter: ["type"];
  params: [Workflow, TypedFlow];
  return: WorkflowChange[];
}

const dispatch = zet<Zet>([], ["type"], {
  select: selectChangeToWorkflowChanges,
  drag: () => [],
  drop: () => [],
});

export function addElseChangeToWorkflowChanges(
  change: AddElseChange,
  workflow: Workflow,
  flow: TypedFlow,
): WorkflowChange[] {
  return dispatch(change, workflow, flow);
}

export type SelectChange = Refine<{
  object: AddElseChange;
  nested: [];
  filter: ["type"];
  narrow: "select";
}>;

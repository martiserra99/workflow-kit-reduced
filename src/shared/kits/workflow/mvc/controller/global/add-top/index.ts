import { zet, type Refine } from "@/shared/lib/zet";

import type { Workflow } from "@/shared/kits/workflow/mvc/model/workflow";
import type { WorkflowChange } from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { TypedFlows } from "@/shared/kits/workflow/mvc/view/types/flows";

import type { AddTopChange } from "..";

import { selectChangeToWorkflowChanges } from "./select";

interface Zet {
  object: AddTopChange;
  nested: [];
  filter: ["type"];
  params: [Workflow, TypedFlows];
  return: WorkflowChange[];
}

const dispatch = zet<Zet>([], ["type"], {
  select: selectChangeToWorkflowChanges,
  drag: () => [],
  drop: () => [],
});

export function addTopChangeToWorkflowChanges(
  change: AddTopChange,
  workflow: Workflow,
  flows: TypedFlows,
): WorkflowChange[] {
  return dispatch(change, workflow, flows);
}

export type SelectChange = Refine<{
  object: AddTopChange;
  nested: [];
  filter: ["type"];
  narrow: "select";
}>;

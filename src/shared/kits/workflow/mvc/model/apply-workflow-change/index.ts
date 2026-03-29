import { zet } from "@/shared/lib/zet";

import type { Workflow } from "../workflow";
import type { WorkflowChange } from "../workflow-change";

import { applyGlobalChange } from "./global";
import { applyElementChange } from "./element";
import { applyElementTypeChange } from "./element-type";

export function applyWorkflowChanges(
  changes: WorkflowChange[],
  workflow: Workflow,
): Workflow {
  let current: Workflow = workflow;
  for (const change of changes) {
    const newWorkflow = applyWorkflowChange(change, current);
    current = newWorkflow;
  }
  return current;
}

interface Zet {
  object: WorkflowChange;
  nested: [];
  filter: ["type"];
  params: [Workflow];
  return: Workflow;
}

const dispatch = zet<Zet>([], ["type"], {
  global: applyGlobalChange,
  element: applyElementChange,
  elementType: applyElementTypeChange,
});

function applyWorkflowChange(
  change: WorkflowChange,
  workflow: Workflow,
): Workflow {
  return dispatch(change, workflow);
}

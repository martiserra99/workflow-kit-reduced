import type {
  WorkflowChange,
  StartSelectChange,
} from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { SelectChange } from ".";

export function selectChangeToWorkflowChanges(
  change: SelectChange,
): WorkflowChange[] {
  if (change.selected) {
    const workflowChange: StartSelectChange = {
      type: "global",
      change: "startSelect",
    };
    return [workflowChange];
  }
  return [];
}

import type {
  WorkflowChange,
  SelectAddTopChange,
} from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { SelectChange } from ".";

export function selectChangeToWorkflowChanges(
  change: SelectChange,
): WorkflowChange[] {
  if (change.selected) {
    const workflowChange: SelectAddTopChange = {
      type: "global",
      change: "selectAddTop",
    };
    return [workflowChange];
  }
  return [];
}

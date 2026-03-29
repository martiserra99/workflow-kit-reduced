import type {
  WorkflowChange,
  EndSelectChange,
} from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { SelectChange } from ".";

export function selectChangeToWorkflowChanges(
  change: SelectChange,
): WorkflowChange[] {
  if (change.selected) {
    const workflowChange: EndSelectChange = {
      type: "global",
      change: "endSelect",
    };
    return [workflowChange];
  }
  return [];
}

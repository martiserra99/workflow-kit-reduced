import type {
  WorkflowChange,
  ActionSelectChange,
} from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { SelectChange } from ".";

export function selectChangeToWorkflowChanges(
  change: SelectChange,
): WorkflowChange[] {
  if (change.selected) {
    const workflowChange: ActionSelectChange = {
      type: "elementType",
      elementType: "action",
      change: "select",
      id: change.node.entity.meta.id,
    };
    return [workflowChange];
  }
  return [];
}

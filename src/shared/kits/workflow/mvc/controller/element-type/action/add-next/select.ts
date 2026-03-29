import type {
  WorkflowChange,
  ElementSelectAddNextChange,
} from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { SelectChange } from ".";

export function selectChangeToWorkflowChanges(
  change: SelectChange,
): WorkflowChange[] {
  if (change.selected) {
    const workflowChange: ElementSelectAddNextChange = {
      type: "element",
      change: "selectAddNext",
      id: change.node.entity.meta.id,
    };
    return [workflowChange];
  }
  return [];
}

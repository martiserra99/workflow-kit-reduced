import type {
  WorkflowChange,
  ConditionSelectAddElseChange,
} from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { SelectChange } from ".";

export function selectChangeToWorkflowChanges(
  change: SelectChange,
): WorkflowChange[] {
  if (change.selected) {
    const workflowChange: ConditionSelectAddElseChange = {
      type: "elementType",
      elementType: "condition",
      change: "selectAddElse",
      id: change.node.entity.meta.id,
    };
    return [workflowChange];
  }
  return [];
}

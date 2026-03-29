import type {
  WorkflowChange,
  ConditionSelectAddThenChange,
} from "@/shared/kits/workflow/mvc/model/workflow-change";

import type { SelectChange } from ".";

export function selectChangeToWorkflowChanges(
  change: SelectChange,
): WorkflowChange[] {
  if (change.selected) {
    const workflowChange: ConditionSelectAddThenChange = {
      type: "elementType",
      elementType: "condition",
      change: "selectAddThen",
      id: change.node.entity.meta.id,
    };
    return [workflowChange];
  }
  return [];
}

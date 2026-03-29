import type {
  Workflow,
  ConditionFlow,
} from "@/shared/kits/workflow/mvc/model/workflow";
import type { ConditionSelectAddThenChange } from "@/shared/kits/workflow/mvc/model/workflow-change";

import { WorkflowUtils } from "../../../utils";

export function selectAddThen(
  change: ConditionSelectAddThenChange,
  workflow: Workflow,
): Workflow {
  const element = WorkflowUtils.get(workflow, change.id) as ConditionFlow;
  return {
    ...workflow,
    active: `${element.id}/addThen`,
  };
}

import type {
  Workflow,
  ActionFlow,
} from "@/shared/kits/workflow/mvc/model/workflow";
import type { ActionSelectChange } from "@/shared/kits/workflow/mvc/model/workflow-change";

import { WorkflowUtils } from "../../../utils";

export function select(
  change: ActionSelectChange,
  workflow: Workflow,
): Workflow {
  const element = WorkflowUtils.get(workflow, change.id) as ActionFlow;
  return {
    ...workflow,
    active: `${element.id}/block`,
  };
}

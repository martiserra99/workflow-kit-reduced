import type { Workflow, ElementFlow } from "../../workflow";
import type { ElementSelectAddNextChange } from "../../workflow-change";

import { WorkflowUtils } from "../../utils";

export function selectAddNext(
  change: ElementSelectAddNextChange,
  workflow: Workflow,
): Workflow {
  const element = WorkflowUtils.get(workflow, change.id) as ElementFlow;
  return {
    ...workflow,
    active: `${element.id}/addNext`,
  };
}

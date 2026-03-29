import type { Workflow } from "../../workflow";
import type { SelectAddTopChange } from "../../workflow-change";

export function selectAddTop(
  change: SelectAddTopChange,
  workflow: Workflow,
): Workflow {
  return {
    ...workflow,
    active: `addTop`,
  };
}

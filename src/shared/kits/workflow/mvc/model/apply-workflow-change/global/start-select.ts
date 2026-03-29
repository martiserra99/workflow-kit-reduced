import type { Workflow } from "../../workflow";
import type { StartSelectChange } from "../../workflow-change";

export function startSelect(
  change: StartSelectChange,
  workflow: Workflow,
): Workflow {
  return {
    ...workflow,
    active: `start`,
  };
}

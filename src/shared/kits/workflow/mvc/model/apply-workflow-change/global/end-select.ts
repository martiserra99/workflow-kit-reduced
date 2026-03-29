import type { Workflow } from "../../workflow";
import type { EndSelectChange } from "../../workflow-change";

export function endSelect(
  change: EndSelectChange,
  workflow: Workflow,
): Workflow {
  return {
    ...workflow,
    active: `end`,
  };
}

import type { Workflow, ElementFlow } from "../workflow";

import { ElementUtils } from "./element-utils";

/**
 * Searches for an element by id in the workflow's flow.
 *
 * @param workflow The current workflow object.
 * @param id The id of the element to find.
 * @returns The found element or `undefined` if not found.
 */
export function get(workflow: Workflow, id: string): ElementFlow | undefined {
  for (const element of workflow.flow.elements) {
    const found = ElementUtils.get(element, id);
    if (found) return found;
  }
  return undefined;
}

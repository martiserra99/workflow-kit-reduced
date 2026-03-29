import type { ConditionFlow, ElementFlow } from "../../../workflow";

import * as ElementUtils from "../element";

/**
 * Searches for an element with the specified id within the given element.
 *
 * @param element The element to start the search from.
 * @param id The id of the element to find.
 * @returns The element with the matching id, or `undefined` if not found.
 */
export function get(
  element: ConditionFlow,
  id: string,
): ElementFlow | undefined {
  if (element.id === id) {
    return element;
  }
  for (const current of element.then) {
    const found = ElementUtils.get(current, id);
    if (found) return found;
  }
  for (const current of element.else) {
    const found = ElementUtils.get(current, id);
    if (found) return found;
  }
  return undefined;
}

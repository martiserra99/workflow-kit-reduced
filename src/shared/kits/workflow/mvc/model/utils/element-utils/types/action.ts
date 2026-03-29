import type { ActionFlow, ElementFlow } from "../../../workflow";

/**
 * Searches for an element with the specified id within the given element.
 *
 * @param element The element to start the search from.
 * @param id The id of the element to find.
 * @returns The element with the matching id, or `undefined` if not found.
 */
export function get(element: ActionFlow, id: string): ElementFlow | undefined {
  if (element.id === id) {
    return element;
  }
  return undefined;
}

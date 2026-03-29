import { zet } from "@/shared/lib/zet";

import type { ElementFlow } from "../../workflow/flow";

import * as ActionUtils from "./types/action";
import * as ConditionUtils from "./types/condition";

interface Zet<T, U> {
  object: ElementFlow;
  nested: [];
  filter: ["type"];
  params: T;
  return: U;
}

type Get = Zet<[string], ElementFlow | undefined>;

/**
 * Searches for an element with the specified id within the given element.
 *
 * @param element The element to start the search from.
 * @param id The id of the element to find.
 * @returns The element with the matching id, or `undefined` if not found.
 */
export const get = zet<Get>([], ["type"], {
  action: ActionUtils.get,
  condition: ConditionUtils.get,
});

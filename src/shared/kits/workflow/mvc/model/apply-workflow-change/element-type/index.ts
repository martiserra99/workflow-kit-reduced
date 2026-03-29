import { zet } from "@/shared/lib/zet";

import type { Workflow } from "../../workflow";
import type { ElementTypeChange } from "../../workflow-change";

import { applyActionChange } from "./action";
import { applyConditionChange } from "./condition";

interface Zet {
  object: ElementTypeChange;
  nested: [];
  filter: ["elementType"];
  params: [Workflow];
  return: Workflow;
}

const dispatch = zet<Zet>([], ["elementType"], {
  action: applyActionChange,
  condition: applyConditionChange,
});

export function applyElementTypeChange(
  change: ElementTypeChange,
  workflow: Workflow,
): Workflow {
  return dispatch(change, workflow);
}

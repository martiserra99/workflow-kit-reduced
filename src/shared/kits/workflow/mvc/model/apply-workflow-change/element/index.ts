import { zet } from "@/shared/lib/zet";

import type { Workflow } from "../../workflow";
import type { ElementChange } from "../../workflow-change";

import { selectAddNext } from "./select-add-next";

interface Zet {
  object: ElementChange;
  nested: [];
  filter: ["change"];
  params: [Workflow];
  return: Workflow;
}

const dispatch = zet<Zet>([], ["change"], {
  selectAddNext: selectAddNext,
});

export function applyElementChange(
  change: ElementChange,
  workflow: Workflow,
): Workflow {
  return dispatch(change, workflow);
}

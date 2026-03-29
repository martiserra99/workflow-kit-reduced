import { zet } from "@/shared/lib/zet";

import type { Workflow } from "../../workflow";
import type { GlobalChange } from "../../workflow-change";

import { startSelect } from "./start-select";
import { endSelect } from "./end-select";
import { selectAddTop } from "./select-add-top";

interface Zet {
  object: GlobalChange;
  nested: [];
  filter: ["change"];
  params: [Workflow];
  return: Workflow;
}

const dispatch = zet<Zet>([], ["change"], {
  startSelect: startSelect,
  endSelect: endSelect,
  selectAddTop: selectAddTop,
});

export function applyGlobalChange(
  change: GlobalChange,
  workflow: Workflow,
): Workflow {
  return dispatch(change, workflow);
}

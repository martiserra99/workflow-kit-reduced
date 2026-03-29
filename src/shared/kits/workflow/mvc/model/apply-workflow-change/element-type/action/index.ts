import { zet } from "@/shared/lib/zet";

import type { Workflow } from "@/shared/kits/workflow/mvc/model/workflow";
import type { ActionChange } from "@/shared/kits/workflow/mvc/model/workflow-change";

import { select } from "./select";

interface Zet {
  object: ActionChange;
  nested: [];
  filter: ["change"];
  params: [Workflow];
  return: Workflow;
}

const dispatch = zet<Zet>([], ["change"], {
  select: select,
});

export function applyActionChange(
  change: ActionChange,
  workflow: Workflow,
): Workflow {
  return dispatch(change, workflow);
}

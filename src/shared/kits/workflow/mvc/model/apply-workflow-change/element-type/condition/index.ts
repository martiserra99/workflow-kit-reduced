import { zet } from "@/shared/lib/zet";

import type { Workflow } from "@/shared/kits/workflow/mvc/model/workflow";
import type { ConditionChange } from "@/shared/kits/workflow/mvc/model/workflow-change";

import { select } from "./select";
import { selectAddThen } from "./select-add-then";
import { selectAddElse } from "./select-add-else";

interface Zet {
  object: ConditionChange;
  nested: [];
  filter: ["change"];
  params: [Workflow];
  return: Workflow;
}

const dispatch = zet<Zet>([], ["change"], {
  select: select,
  selectAddThen: selectAddThen,
  selectAddElse: selectAddElse,
});

export function applyConditionChange(
  change: ConditionChange,
  workflow: Workflow,
): Workflow {
  return dispatch(change, workflow);
}

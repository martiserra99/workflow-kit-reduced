import { zet } from "@/shared/lib/zet";

import type { ElementFlow } from "@/shared/kits/workflow/mvc/model/workflow";
import type { TypedFlowNode } from "@/shared/kits/workflow/mvc/view/types/flows";

import type { Options } from "../types";

import { actionView } from "./action";
import { conditionView } from "./condition";

interface Zet {
  object: ElementFlow;
  nested: [];
  filter: ["type"];
  params: [Options];
  return: [TypedFlowNode, TypedFlowNode];
}

const dispatch = zet<Zet>([], ["type"], {
  action: actionView,
  condition: conditionView,
});

export function elementView(
  element: ElementFlow,
  options: Options,
): [TypedFlowNode, TypedFlowNode] {
  return dispatch(element, options);
}

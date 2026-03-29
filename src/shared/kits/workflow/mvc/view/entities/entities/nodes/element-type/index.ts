import type { NodeTypes } from "@xyflow/react";

import { actionNodeTypes, ActionEntity } from "./action";
import { conditionNodeTypes, ConditionEntity } from "./condition";

export type ElementTypeEntity = ActionEntity | ConditionEntity;

export const elementTypeNodeTypes: NodeTypes = {
  ...actionNodeTypes,
  ...conditionNodeTypes,
};

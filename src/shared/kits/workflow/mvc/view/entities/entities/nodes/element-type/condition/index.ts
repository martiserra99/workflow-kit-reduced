import type { NodeTypes } from "@xyflow/react";

import Block, { BlockEntity } from "./block";
import AddNext, { AddNextEntity } from "./add-next";
import AddThen, { AddThenEntity } from "./add-then";
import AddElse, { AddElseEntity } from "./add-else";
import LabelThen, { LabelThenEntity } from "./label-then";
import LabelElse, { LabelElseEntity } from "./label-else";

export type ConditionEntity =
  | BlockEntity
  | AddNextEntity
  | AddThenEntity
  | AddElseEntity
  | LabelThenEntity
  | LabelElseEntity;

export const conditionNodeTypes: NodeTypes = {
  "elementType/condition/block": Block,
  "elementType/condition/addNext": AddNext,
  "elementType/condition/addThen": AddThen,
  "elementType/condition/addElse": AddElse,
  "elementType/condition/labelThen": LabelThen,
  "elementType/condition/labelElse": LabelElse,
};

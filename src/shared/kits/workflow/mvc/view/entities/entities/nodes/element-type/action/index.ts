import type { NodeTypes } from "@xyflow/react";

import Block, { BlockEntity } from "./block";
import AddNext, { AddNextEntity } from "./add-next";

export type ActionEntity = BlockEntity | AddNextEntity;

export const actionNodeTypes: NodeTypes = {
  "elementType/action/block": Block,
  "elementType/action/addNext": AddNext,
};

import type { NodeTypes } from "@xyflow/react";

import { globalNodeTypes, GlobalEntity } from "./global";
import { elementTypeNodeTypes, ElementTypeEntity } from "./element-type";

export type NodeEntity = GlobalEntity | ElementTypeEntity;

export const nodeTypes: NodeTypes = {
  ...globalNodeTypes,
  ...elementTypeNodeTypes,
};

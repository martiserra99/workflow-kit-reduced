import type { NodeTypes } from "@xyflow/react";

import Start, { StartEntity } from "./start";
import End, { EndEntity } from "./end";
import AddTop, { AddTopEntity } from "./add-top";

export type GlobalEntity = StartEntity | EndEntity | AddTopEntity;

export const globalNodeTypes: NodeTypes = {
  "global/start": Start,
  "global/end": End,
  "global/addTop": AddTop,
};

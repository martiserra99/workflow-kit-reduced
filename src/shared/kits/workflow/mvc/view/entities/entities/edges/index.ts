import type { EdgeTypes } from "@xyflow/react";

import Line, { LineEntity } from "./line";

export type EdgeEntity = LineEntity;

export const edgeTypes: EdgeTypes = {
  line: Line,
};

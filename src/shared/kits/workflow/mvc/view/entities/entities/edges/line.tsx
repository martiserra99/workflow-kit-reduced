import type { Edge, EdgeProps } from "@xyflow/react";

import { BaseEdge } from "@xyflow/react";

import { getSmoothStepPath } from "@/shared/lib/flows";

export interface LineEntity {
  type: "line";
  data: Record<never, never>;
}

export default function Line({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
}: EdgeProps<Edge<LineEntity["data"], LineEntity["type"]>>) {
  const path = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    offset: 16,
    radius: 12,
  });
  return (
    <BaseEdge
      id={id}
      path={path}
      style={{
        ...style,
        stroke: `var(--color-gray-300)`,
        strokeWidth: 1,
        strokeOpacity: 1,
      }}
    />
  );
}

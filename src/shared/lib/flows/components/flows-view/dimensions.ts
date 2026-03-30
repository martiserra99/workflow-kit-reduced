import type { NodeChange } from "@xyflow/react";

export type Dimensions = Record<string, { width: number; height: number }>;

export type DimensionsChange = {
  id: string;
  dimensions: { width: number; height: number } | undefined;
};

export function nodeChangesToDimensionsChanges(
  changes: NodeChange[]
): DimensionsChange[] {
  const dimensionsChanges: DimensionsChange[] = [];
  for (const change of changes) {
    if (change.type === "dimensions") {
      if (change.dimensions) {
        dimensionsChanges.push({
          id: change.id,
          dimensions: change.dimensions,
        });
      } else {
        dimensionsChanges.push({
          id: change.id,
          dimensions: undefined,
        });
      }
    }
  }
  return dimensionsChanges;
}

export function applyDimensionsChanges(
  changes: DimensionsChange[],
  dimensions: Dimensions
): Dimensions {
  const updated: Dimensions = { ...dimensions };
  for (const change of changes) {
    if (change.dimensions) {
      updated[change.id] = change.dimensions;
    } else {
      delete updated[change.id];
    }
  }
  return updated;
}

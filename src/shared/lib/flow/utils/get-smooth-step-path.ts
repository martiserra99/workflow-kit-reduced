/**
 * Creates a smooth path between two points with rounded corners in a step-like shape.
 *
 * @param options Object containing:
 *   - sourceX: x-coordinate of the starting point.
 *   - sourceY: y-coordinate of the starting point.
 *   - targetX: x-coordinate of the ending point.
 *   - targetY: y-coordinate of the ending point.
 *   - radius: Maximum allowed corner radius.
 *   - offset: Vertical distance from targetY where the vertical line turns horizontal.
 *
 * @returns A string representing the SVG path.
 */
export function getSmoothStepPath({
  sourceX,
  sourceY,
  targetX,
  targetY,
  radius: maximumRadius,
  offset,
}: {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  radius: number;
  offset: number;
}): string {
  const radius = getRadius({
    sourceX,
    sourceY,
    targetX,
    targetY,
    maximumRadius,
  });
  const path = getPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    radius,
    offset,
  });
  return path;
}

function getRadius({
  sourceX,
  sourceY,
  targetX,
  targetY,
  maximumRadius,
}: {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  maximumRadius: number;
}): number {
  let radius = maximumRadius;
  radius = Math.min(radius, Math.abs(targetX - sourceX) / 2);
  radius = Math.min(radius, Math.abs(targetY - sourceY) / 2);
  return radius;
}

function getPath({
  sourceX,
  sourceY,
  targetX,
  targetY,
  radius,
  offset,
}: {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  radius: number;
  offset: number;
}) {
  const dir = sourceX < targetX ? 1 : -1;
  return [
    `M${sourceX},${sourceY}`,
    `L${sourceX},${targetY - offset - radius}`,
    `Q${sourceX},${targetY - offset} ${sourceX + dir * radius},${targetY - offset}`,
    `L${targetX - dir * radius},${targetY - offset}`,
    `Q${targetX},${targetY - offset} ${targetX},${targetY - offset + radius}`,
    `L${targetX},${targetY}`,
  ].join("");
}

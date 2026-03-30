import type { EdgeChange } from "@xyflow/react";

import type { Flows } from "@/shared/lib/flows/types/flows";
import type { FlowsChange } from "@/shared/lib/flows/types/flows-change";
import type { NodeEntity, EdgeEntity } from "@/shared/lib/flows/types/entity";

import { zet } from "@/shared/lib/zet";

export function edgeChangesToFlowsChanges<
  T extends NodeEntity,
  U extends EdgeEntity,
>(edgeChanges: EdgeChange[], flows: Flows<T, U>): FlowsChange<T, U>[] {
  return edgeChanges.flatMap((edgeChange) =>
    edgeChangeToFlowsChanges(edgeChange, flows),
  );
}

interface Zet<T extends NodeEntity, U extends EdgeEntity> {
  object: EdgeChange;
  nested: [];
  filter: ["type"];
  params: [Flows<T, U>];
  return: FlowsChange<T, U>[];
}

function edgeChangeToFlowsChanges<T extends NodeEntity, U extends EdgeEntity>(
  edgeChange: EdgeChange,
  flows: Flows<T, U>,
): FlowsChange<T, U>[] {
  return zet<Zet<T, U>>([], ["type"], {
    add: () => [],
    remove: () => [],
    replace: () => [],
    select: () => [],
  })(edgeChange, flows);
}

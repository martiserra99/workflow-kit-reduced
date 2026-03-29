import type { EdgeChange } from "@xyflow/react";

import type { Flow } from "@/shared/lib/flow/types/flow";
import type { FlowChange } from "@/shared/lib/flow/types/flow-change";
import type { NodeEntity, EdgeEntity } from "@/shared/lib/flow/types/entity";

import { zet } from "@/shared/lib/zet";

export function edgeChangesToFlowChanges<
  T extends NodeEntity,
  U extends EdgeEntity,
>(edgeChanges: EdgeChange[], flow: Flow<T, U>): FlowChange<T, U>[] {
  return edgeChanges.flatMap((edgeChange) =>
    edgeChangeToFlowChanges(edgeChange, flow),
  );
}

interface Zet<T extends NodeEntity, U extends EdgeEntity> {
  object: EdgeChange;
  nested: [];
  filter: ["type"];
  params: [Flow<T, U>];
  return: FlowChange<T, U>[];
}

function edgeChangeToFlowChanges<T extends NodeEntity, U extends EdgeEntity>(
  edgeChange: EdgeChange,
  flow: Flow<T, U>,
): FlowChange<T, U>[] {
  return zet<Zet<T, U>>([], ["type"], {
    add: () => [],
    remove: () => [],
    replace: () => [],
    select: () => [],
  })(edgeChange, flow);
}

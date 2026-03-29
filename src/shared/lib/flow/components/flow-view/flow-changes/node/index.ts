import type { NodeChange } from "@xyflow/react";

import type { Flow } from "@/shared/lib/flow/types/flow";
import type { FlowChange } from "@/shared/lib/flow/types/flow-change";
import type { NodeEntity, EdgeEntity } from "@/shared/lib/flow/types/entity";

import { zet } from "@/shared/lib/zet";

import { select } from "./select";
import { position } from "./position";

export function nodeChangesToFlowChanges<
  T extends NodeEntity,
  U extends EdgeEntity,
>(nodeChanges: NodeChange[], flow: Flow<T, U>): FlowChange<T, U>[] {
  return nodeChanges.flatMap((nodeChange) =>
    nodeChangeToFlowChanges(nodeChange, flow),
  );
}

interface Zet<T extends NodeEntity, U extends EdgeEntity> {
  object: NodeChange;
  nested: [];
  filter: ["type"];
  params: [Flow<T, U>];
  return: FlowChange<T, U>[];
}

function nodeChangeToFlowChanges<T extends NodeEntity, U extends EdgeEntity>(
  nodeChange: NodeChange,
  flow: Flow<T, U>,
): FlowChange<T, U>[] {
  return zet<Zet<T, U>>([], ["type"], {
    add: () => [],
    dimensions: () => [],
    position: position,
    remove: () => [],
    replace: () => [],
    select: select,
  })(nodeChange, flow);
}

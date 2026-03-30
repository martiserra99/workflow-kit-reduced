import type { NodeChange } from "@xyflow/react";

import type { Flows } from "@/shared/lib/flows/types/flows";
import type { FlowsChange } from "@/shared/lib/flows/types/flows-change";
import type { NodeEntity, EdgeEntity } from "@/shared/lib/flows/types/entity";

import { zet } from "@/shared/lib/zet";

import { select } from "./select";
import { position } from "./position";

export function nodeChangesToFlowsChanges<
  T extends NodeEntity,
  U extends EdgeEntity,
>(nodeChanges: NodeChange[], flows: Flows<T, U>): FlowsChange<T, U>[] {
  return nodeChanges.flatMap((nodeChange) =>
    nodeChangeToFlowsChanges(nodeChange, flows),
  );
}

interface Zet<T extends NodeEntity, U extends EdgeEntity> {
  object: NodeChange;
  nested: [];
  filter: ["type"];
  params: [Flows<T, U>];
  return: FlowsChange<T, U>[];
}

function nodeChangeToFlowsChanges<T extends NodeEntity, U extends EdgeEntity>(
  nodeChange: NodeChange,
  flows: Flows<T, U>,
): FlowsChange<T, U>[] {
  return zet<Zet<T, U>>([], ["type"], {
    add: () => [],
    dimensions: () => [],
    position: position,
    remove: () => [],
    replace: () => [],
    select: select,
  })(nodeChange, flows);
}

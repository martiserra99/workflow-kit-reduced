import type { NodeSelectionChange } from "@xyflow/react";

import type { Flows } from "@/shared/lib/flows/types/flows";
import type {
  FlowsChange,
  NodeSelectChange,
} from "@/shared/lib/flows/types/flows-change";

import type { NodeEntity, EdgeEntity } from "@/shared/lib/flows/types/entity";

export function select<T extends NodeEntity, U extends EdgeEntity>(
  change: NodeSelectionChange,
  flows: Flows<T, U>,
): FlowsChange<T, U>[] {
  const node = flows.nodes.get(change.id)!;
  const selectChange: NodeSelectChange<T, U> = {
    type: "select",
    node: node,
    selected: change.selected,
  };
  return [selectChange];
}

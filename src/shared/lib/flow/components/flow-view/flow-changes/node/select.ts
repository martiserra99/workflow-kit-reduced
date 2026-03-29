import type { NodeSelectionChange } from "@xyflow/react";

import type { Flow } from "@/shared/lib/flow/types/flow";
import type {
  FlowChange,
  NodeSelectChange,
} from "@/shared/lib/flow/types/flow-change";

import type { NodeEntity, EdgeEntity } from "@/shared/lib/flow/types/entity";

export function select<T extends NodeEntity, U extends EdgeEntity>(
  change: NodeSelectionChange,
  flow: Flow<T, U>,
): FlowChange<T, U>[] {
  const node = flow.nodes.get(change.id)!;
  const selectChange: NodeSelectChange<T, U> = {
    type: "select",
    node: node,
    selected: change.selected,
  };
  return [selectChange];
}

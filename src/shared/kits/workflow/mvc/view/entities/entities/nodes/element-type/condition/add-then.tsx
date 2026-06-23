import { Handle, Position, NodeProps, Node } from "@xyflow/react";

import Base from "@/shared/kits/workflow/mvc/view/entities/components/add";

export interface AddThenEntity {
  type: "elementType/condition/addThen";
  meta: {
    type: "elementType";
    elementType: "condition";
    item: "addThen";
    id: string;
  };
  data: Record<never, never>;
}

export default function AddThen({
  selected,
}: NodeProps<Node<AddThenEntity["data"], AddThenEntity["type"]>>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Base selected={selected} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

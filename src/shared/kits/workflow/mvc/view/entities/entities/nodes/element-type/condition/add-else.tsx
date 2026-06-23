import { Handle, Position, NodeProps, Node } from "@xyflow/react";

import Base from "@/shared/kits/workflow/mvc/view/entities/components/add";

export interface AddElseEntity {
  type: "elementType/condition/addElse";
  meta: {
    type: "elementType";
    elementType: "condition";
    item: "addElse";
    id: string;
  };
  data: Record<never, never>;
}

export default function AddElse({
  selected,
}: NodeProps<Node<AddElseEntity["data"], AddElseEntity["type"]>>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Base selected={selected} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

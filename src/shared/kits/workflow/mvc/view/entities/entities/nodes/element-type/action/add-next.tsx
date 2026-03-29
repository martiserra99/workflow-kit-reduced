import { Handle, Position, NodeProps, Node } from "@xyflow/react";

import Base from "@/shared/kits/workflow/mvc/view/entities/components/add";

export interface AddNextEntity {
  type: "elementType/action/addNext";
  meta: {
    type: "elementType";
    elementType: "action";
    item: "addNext";
    id: string;
  };
  data: { [key: string]: never };
}

export default function AddNext({
  selected,
}: NodeProps<Node<AddNextEntity["data"], AddNextEntity["type"]>>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Base selected={selected} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

import { Handle, Position, NodeProps, Node } from "@xyflow/react";

import Base from "@/shared/kits/workflow/mvc/view/entities/components/add";

export interface AddTopEntity {
  type: "global/addTop";
  meta: {
    type: "global";
    item: "addTop";
    id: "addTop";
  };
  data: Record<never, never>;
}

export default function AddTop({
  selected,
}: NodeProps<Node<AddTopEntity["data"], AddTopEntity["type"]>>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Base selected={selected} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

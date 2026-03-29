import { Handle, Position, NodeProps, Node } from "@xyflow/react";

import { EndIcon } from "@/shared/kits/workflow/icons/end";

import Base from "@/shared/kits/workflow/mvc/view/entities/components/block";

export interface EndEntity {
  type: "global/end";
  meta: {
    type: "global";
    item: "end";
    id: "end";
  };
  data: {
    text: string;
  };
}

export default function End({
  data,
  selected,
}: NodeProps<Node<EndEntity["data"], EndEntity["type"]>>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Base selected={selected}>
        <Base.Header>
          <Base.IconName>
            <Base.Icon icon={EndIcon} />
            <Base.Name>End</Base.Name>
          </Base.IconName>
        </Base.Header>
        <Base.Content>{data.text}</Base.Content>
      </Base>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

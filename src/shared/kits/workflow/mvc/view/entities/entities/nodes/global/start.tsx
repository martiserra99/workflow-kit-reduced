import { Handle, Position, NodeProps, Node } from "@xyflow/react";

import { StartIcon } from "@/shared/kits/workflow/icons/start";

import Base from "@/shared/kits/workflow/mvc/view/entities/components/block";

export interface StartEntity {
  type: "global/start";
  meta: {
    type: "global";
    item: "start";
    id: "start";
  };
  data: {
    text: string;
  };
}

export default function Start({
  data,
  selected,
}: NodeProps<Node<StartEntity["data"], StartEntity["type"]>>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Base selected={selected}>
        <Base.Header>
          <Base.IconName>
            <Base.Icon icon={StartIcon} />
            <Base.Name>Start</Base.Name>
          </Base.IconName>
        </Base.Header>
        <Base.Content>{data.text}</Base.Content>
      </Base>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

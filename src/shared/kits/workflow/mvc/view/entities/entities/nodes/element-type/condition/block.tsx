import { Handle, Position, NodeProps, Node } from "@xyflow/react";

import { ConditionIcon } from "@/shared/kits/workflow/icons/condition";

import Base from "@/shared/kits/workflow/mvc/view/entities/components/block";

export interface BlockEntity {
  type: "elementType/condition/block";
  meta: {
    type: "elementType";
    elementType: "condition";
    item: "block";
    id: string;
  };
  data: {
    text: string;
    onRemove: () => void;
  };
}

export default function Block({
  data,
  selected,
}: NodeProps<Node<BlockEntity["data"], BlockEntity["type"]>>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Base selected={selected}>
        <Base.Header>
          <Base.IconName>
            <Base.Icon icon={ConditionIcon} />
            <Base.Name>Condition</Base.Name>
          </Base.IconName>
          <Base.Delete onRemove={data.onRemove} />
        </Base.Header>
        <Base.Content>{data.text}</Base.Content>
      </Base>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

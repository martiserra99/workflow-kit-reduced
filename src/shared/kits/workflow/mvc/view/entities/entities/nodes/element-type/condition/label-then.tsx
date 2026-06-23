import { Handle, Position } from "@xyflow/react";

import Base from "@/shared/kits/workflow/mvc/view/entities/components/label";

export interface LabelThenEntity {
  type: "elementType/condition/labelThen";
  meta: {
    type: "elementType";
    elementType: "condition";
    item: "labelThen";
    id: string;
  };
  data: Record<never, never>;
}

export default function LabelThen() {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Base>Then</Base>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

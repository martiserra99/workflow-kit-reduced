import { Handle, Position } from "@xyflow/react";

import Base from "@/shared/kits/workflow/mvc/view/entities/components/label";

export interface LabelElseEntity {
  type: "elementType/condition/labelElse";
  meta: {
    type: "elementType";
    elementType: "condition";
    item: "labelElse";
    id: string;
  };
  data: { [key: string]: never };
}

export default function LabelElse() {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Base>Else</Base>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

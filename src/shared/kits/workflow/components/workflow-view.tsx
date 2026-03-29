import type { Workflow } from "../mvc/model/workflow";
import type { OnWorkflowChange } from "../mvc/model/on-workflow-change";

import type { TypedFlowChange } from "../mvc/view/types/flow-change";

import { useMemo, useCallback } from "react";

import { FlowView } from "@/shared/lib/flow";

import { workflowView } from "../mvc/view/view";
import { nodeTypes, edgeTypes } from "../mvc/view/entities";

import { toWorkflowChanges } from "../mvc/controller";

interface WorkflowViewProps {
  workflow: Workflow;
  onWorkflowChange: OnWorkflowChange;
}

export function WorkflowView({
  workflow,
  onWorkflowChange,
}: WorkflowViewProps) {
  const flow = useMemo(
    () => workflowView(workflow, onWorkflowChange),
    [workflow, onWorkflowChange],
  );

  const onFlowChange = useCallback(
    (changes: TypedFlowChange[]) => {
      const array = toWorkflowChanges(changes, workflow, flow);
      if (array.length) onWorkflowChange(array);
    },
    [onWorkflowChange, workflow, flow],
  );

  return (
    <FlowView
      flow={flow}
      onFlowChange={onFlowChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
    />
  );
}

import type { Workflow } from "../mvc/model/workflow";
import type { OnWorkflowChange } from "../mvc/model/on-workflow-change";

import type { TypedFlowsChange } from "../mvc/view/types/flows-change";

import { useMemo, useCallback } from "react";

import { FlowsView } from "@/shared/lib/flows";

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
  const flows = useMemo(
    () => workflowView(workflow, onWorkflowChange),
    [workflow, onWorkflowChange],
  );

  const onFlowsChange = useCallback(
    (changes: TypedFlowsChange[]) => {
      const array = toWorkflowChanges(changes, workflow, flows);
      if (array.length) onWorkflowChange(array);
    },
    [onWorkflowChange, workflow, flows],
  );

  return (
    <FlowsView
      flows={flows}
      onFlowsChange={onFlowsChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
    />
  );
}

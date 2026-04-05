"use client";

import { useCallback, useState } from "react";

import {
  WorkflowView,
  Workflow,
  WorkflowChange,
  applyWorkflowChanges,
} from "@/shared/kits/workflow";

function initialWorkflow(): Workflow {
  return {
    flow: {
      start: { message: "" },
      elements: [
        {
          type: "condition",
          id: "A",
          if: "",
          then: [
            {
              type: "action",
              id: "B",
              message: "",
            },
          ],
          else: [
            {
              type: "action",
              id: "C",
              message: "",
            },
          ],
        },
      ],
      end: { message: "" },
    },
    active: null,
  };
}

export default function Home() {
  const [workflow, setWorkflow] = useState(() => initialWorkflow());

  const onWorkflowChange = useCallback((changes: WorkflowChange[]) => {
    setWorkflow((workflow) => applyWorkflowChanges(changes, workflow));
  }, []);

  return (
    <div className="flex h-screen flex-col bg-neutral-900">
      <WorkflowView workflow={workflow} onWorkflowChange={onWorkflowChange} />
    </div>
  );
}

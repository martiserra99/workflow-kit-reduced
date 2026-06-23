"use client";

import { useState, useCallback } from "react";

import {
  WorkflowView,
  applyWorkflowChanges,
  type Workflow,
  type WorkflowChange,
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
    <div className="flex h-screen flex-col bg-white">
      <WorkflowView workflow={workflow} onWorkflowChange={onWorkflowChange} />
    </div>
  );
}

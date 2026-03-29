import type {
  WorkflowFlow,
  ElementFlow,
  ActionFlow,
  ConditionFlow,
} from "./flow";

export interface Workflow {
  flow: WorkflowFlow;
  active: string | null; // String that identifies the active selection.
}

export type { WorkflowFlow, ElementFlow, ActionFlow, ConditionFlow };

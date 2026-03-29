import type { WorkflowChange } from "./workflow-change";

export type OnWorkflowChange = (changes: WorkflowChange[]) => void;

export type WorkflowFlow = {
  start: { message: string };
  elements: ElementFlow[];
  end: { message: string };
};

export type ElementFlow = ActionFlow | ConditionFlow;

export interface ActionFlow {
  type: "action";
  id: string;
  message: string;
}

export interface ConditionFlow {
  type: "condition";
  id: string;
  if: string;
  then: ElementFlow[];
  else: ElementFlow[];
}

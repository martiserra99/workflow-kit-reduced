export type ConditionChange =
  | ConditionSelectChange
  | ConditionSelectAddThenChange
  | ConditionSelectAddElseChange;

export interface ConditionSelectChange {
  type: "elementType";
  elementType: "condition";
  change: "select";
  id: string;
}

export interface ConditionSelectAddThenChange {
  type: "elementType";
  elementType: "condition";
  change: "selectAddThen";
  id: string;
}

export interface ConditionSelectAddElseChange {
  type: "elementType";
  elementType: "condition";
  change: "selectAddElse";
  id: string;
}

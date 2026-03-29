import type { ActionChange, ActionSelectChange } from "./action";

import type {
  ConditionChange,
  ConditionSelectChange,
  ConditionSelectAddThenChange,
  ConditionSelectAddElseChange,
} from "./condition";

export type ElementTypeChange = ActionChange | ConditionChange;

export type { ActionChange, ActionSelectChange };

export type {
  ConditionChange,
  ConditionSelectChange,
  ConditionSelectAddThenChange,
  ConditionSelectAddElseChange,
};

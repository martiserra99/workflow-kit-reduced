import type {
  GlobalChange,
  StartSelectChange,
  EndSelectChange,
  SelectAddTopChange,
} from "./global";

import type { ElementChange, ElementSelectAddNextChange } from "./element";

import type {
  ElementTypeChange,
  ActionChange,
  ActionSelectChange,
  ConditionChange,
  ConditionSelectChange,
  ConditionSelectAddThenChange,
  ConditionSelectAddElseChange,
} from "./element-type";

export type WorkflowChange = GlobalChange | ElementChange | ElementTypeChange;

export type {
  GlobalChange,
  StartSelectChange,
  EndSelectChange,
  SelectAddTopChange,
};

export type { ElementChange, ElementSelectAddNextChange };

export type {
  ElementTypeChange,
  ActionChange,
  ActionSelectChange,
  ConditionChange,
  ConditionSelectChange,
  ConditionSelectAddThenChange,
  ConditionSelectAddElseChange,
};

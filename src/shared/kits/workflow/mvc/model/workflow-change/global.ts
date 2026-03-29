export type GlobalChange =
  | StartSelectChange
  | EndSelectChange
  | SelectAddTopChange;

export interface StartSelectChange {
  type: "global";
  change: "startSelect";
}

export interface EndSelectChange {
  type: "global";
  change: "endSelect";
}

export interface SelectAddTopChange {
  type: "global";
  change: "selectAddTop";
}

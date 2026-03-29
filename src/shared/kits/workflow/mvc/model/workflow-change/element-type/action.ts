export type ActionChange = ActionSelectChange;

export interface ActionSelectChange {
  type: "elementType";
  elementType: "action";
  change: "select";
  id: string;
}

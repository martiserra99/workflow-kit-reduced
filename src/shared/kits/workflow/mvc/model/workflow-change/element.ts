export type ElementChange = ElementSelectAddNextChange;

export interface ElementSelectAddNextChange {
  type: "element";
  change: "selectAddNext";
  id: string;
}

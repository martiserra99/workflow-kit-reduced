export interface NodeEntity {
  type: string;
  meta: Record<string, unknown>;
  data: Record<string, unknown>;
}

export interface EdgeEntity {
  type: string;
  data: Record<string, unknown>;
}

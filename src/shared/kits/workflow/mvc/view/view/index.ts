import { constants } from "@/constants";

import type { Workflow } from "@/shared/kits/workflow/mvc/model/workflow";
import type { OnWorkflowChange } from "@/shared/kits/workflow/mvc/model/on-workflow-change";

import type {
  TypedFlow,
  TypedFlowNode,
  TypedFlowEdge,
  TypedFlowComponent,
} from "../types/flow";

import type { NodeEntity, EdgeEntity } from "../entities";

import { autoLayout, connect } from "@/shared/lib/flow";

import { isSelected } from "./utils";

import { elementView } from "./element";

export function workflowView(
  workflow: Workflow,
  onWorkflowChange: OnWorkflowChange,
): TypedFlow {
  const map = new Map<string, TypedFlowNode>();

  const start: TypedFlowComponent = {
    id: "start",
    type: "component",
    entity: {
      type: "global/start",
      meta: {
        type: "global",
        item: "start",
        id: "start",
      },
      data: {
        text: workflow.flow.start.message,
      },
    },
    selected: isSelected("start", workflow.active),
    position: {
      x: 0,
      y: 0,
    },
    positionAbsolute: {
      x: 0,
      y: 0,
    },
    size: {
      w: constants.workflow.node.block.w,
      h: constants.workflow.node.block.h.md,
    },
    gaps: {
      next: 0,
    },
    next: [],
    prev: [],
    parent: null,
  };

  map.set(start.id, start);

  const addTop: TypedFlowComponent = {
    id: "addTop",
    type: "component",
    entity: {
      type: "global/addTop",
      meta: {
        type: "global",
        item: "addTop",
        id: "addTop",
      },
      data: {},
    },
    selected: isSelected("addTop", workflow.active),
    position: {
      x: 0,
      y: 0,
    },
    positionAbsolute: {
      x: 0,
      y: 0,
    },
    size: {
      w: constants.workflow.node.add.size.w,
      h: constants.workflow.node.add.size.h,
    },
    gaps: {
      next: 0,
    },
    next: [],
    prev: [],
    parent: null,
  };

  map.set(addTop.id, addTop);

  const end: TypedFlowComponent = {
    id: "end",
    type: "component",
    entity: {
      type: "global/end",
      meta: {
        type: "global",
        item: "end",
        id: "end",
      },
      data: {
        text: workflow.flow.end.message,
      },
    },
    selected: isSelected("end", workflow.active),
    position: {
      x: 0,
      y: 0,
    },
    positionAbsolute: {
      x: 0,
      y: 0,
    },
    size: {
      w: constants.workflow.node.block.w,
      h: constants.workflow.node.block.h.md,
    },
    gaps: {
      next: 0,
    },
    next: [],
    prev: [],
    parent: null,
  };

  map.set(end.id, end);

  const nodes = workflow.flow.elements.map((n) => {
    return elementView(n, {
      active: workflow.active,
      map: map,
      parent: null,
      onWorkflowChange: onWorkflowChange,
    });
  });

  connect<NodeEntity, EdgeEntity>(
    [start, addTop, ...nodes, end],
    (top, bottom): TypedFlowEdge => ({
      id: `${top.id}-${bottom.id}`,
      entity: {
        type: "line",
        data: {},
      },
      length: constants.workflow.edge.sm,
      source: top,
      target: bottom,
    }),
  );

  autoLayout(start);

  return { roots: [start], nodes: map };
}

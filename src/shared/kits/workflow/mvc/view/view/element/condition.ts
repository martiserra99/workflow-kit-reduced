import { constants } from "@/constants";

import type { ConditionFlow } from "@/shared/kits/workflow/mvc/model/workflow";
import type {
  TypedFlowNode,
  TypedFlowEdge,
  TypedFlowComponent,
} from "@/shared/kits/workflow/mvc/view/types/flows";

import { connect } from "@/shared/lib/flows";

import { elementView } from ".";

import type { Options } from "../types";

import { isSelected } from "../utils";

export function conditionView(
  element: ConditionFlow,
  options: Options,
): [TypedFlowNode, TypedFlowNode] {
  const block: TypedFlowComponent = {
    id: `${element.id}/block`,
    type: "component",
    entity: {
      type: "elementType/condition/block",
      meta: {
        type: "elementType",
        elementType: "condition",
        item: "block",
        id: element.id,
      },
      data: {
        text: element.if,
        onRemove: () => {},
      },
    },
    selected: isSelected(`${element.id}/block`, options.active),
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
      next: constants.workflow.gaps.next,
    },
    next: [],
    prev: [],
    parent: options.parent,
  };

  options.map.set(block.id, block);

  const addNext: TypedFlowComponent = {
    id: `${element.id}/addNext`,
    type: "component",
    entity: {
      type: "elementType/condition/addNext",
      meta: {
        type: "elementType",
        elementType: "condition",
        item: "addNext",
        id: element.id,
      },
      data: {},
    },
    selected: isSelected(`${element.id}/addNext`, options.active),
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
    parent: options.parent,
  };

  options.map.set(addNext.id, addNext);

  const labelThen: TypedFlowComponent = {
    id: `${element.id}/labelThen`,
    type: "component",
    entity: {
      type: "elementType/condition/labelThen",
      meta: {
        type: "elementType",
        elementType: "condition",
        item: "labelThen",
        id: element.id,
      },
      data: {},
    },
    selected: isSelected(`${element.id}/labelThen`, options.active),
    position: {
      x: 0,
      y: 0,
    },
    positionAbsolute: {
      x: 0,
      y: 0,
    },
    size: {
      w: constants.workflow.node.label.w,
      h: constants.workflow.node.label.h,
    },
    gaps: {
      next: 0,
    },
    next: [],
    prev: [],
    parent: options.parent,
  };

  options.map.set(labelThen.id, labelThen);

  const labelElse: TypedFlowComponent = {
    id: `${element.id}/labelElse`,
    type: "component",
    entity: {
      type: "elementType/condition/labelElse",
      meta: {
        type: "elementType",
        elementType: "condition",
        item: "labelElse",
        id: element.id,
      },
      data: {},
    },
    selected: isSelected(`${element.id}/labelElse`, options.active),
    position: {
      x: 0,
      y: 0,
    },
    positionAbsolute: {
      x: 0,
      y: 0,
    },
    size: {
      w: constants.workflow.node.label.w,
      h: constants.workflow.node.label.h,
    },
    gaps: {
      next: 0,
    },
    next: [],
    prev: [],
    parent: options.parent,
  };

  options.map.set(labelElse.id, labelElse);

  const addThen: TypedFlowComponent = {
    id: `${element.id}/addThen`,
    type: "component",
    entity: {
      type: "elementType/condition/addThen",
      meta: {
        type: "elementType",
        elementType: "condition",
        item: "addThen",
        id: element.id,
      },
      data: {},
    },
    selected: isSelected(`${element.id}/addThen`, options.active),
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
    parent: options.parent,
  };

  options.map.set(addThen.id, addThen);

  const addElse: TypedFlowComponent = {
    id: `${element.id}/addElse`,
    type: "component",
    entity: {
      type: "elementType/condition/addElse",
      meta: {
        type: "elementType",
        elementType: "condition",
        item: "addElse",
        id: element.id,
      },
      data: {},
    },
    selected: isSelected(`${element.id}/addElse`, options.active),
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
    parent: options.parent,
  };

  options.map.set(addElse.id, addElse);

  const blockToLabelThen: TypedFlowEdge = {
    id: `${block.id}-${labelThen.id}`,
    entity: { type: "line", data: {} },
    length: constants.workflow.edge.md,
    source: block,
    target: labelThen,
  };

  const blockToLabelElse: TypedFlowEdge = {
    id: `${block.id}-${labelElse.id}`,
    entity: { type: "line", data: {} },
    length: constants.workflow.edge.md,
    source: block,
    target: labelElse,
  };

  const labelThenToAddThen: TypedFlowEdge = {
    id: `${labelThen.id}-${addThen.id}`,
    entity: { type: "line", data: {} },
    length: constants.workflow.edge.sm,
    source: labelThen,
    target: addThen,
  };

  const labelElseToAddElse: TypedFlowEdge = {
    id: `${labelElse.id}-${addElse.id}`,
    entity: { type: "line", data: {} },
    length: constants.workflow.edge.sm,
    source: labelElse,
    target: addElse,
  };

  block.next.push({ edge: blockToLabelThen, node: labelThen });
  labelThen.prev.push({ edge: blockToLabelThen, node: block });

  block.next.push({ edge: blockToLabelElse, node: labelElse });
  labelElse.prev.push({ edge: blockToLabelElse, node: block });

  labelThen.next.push({ edge: labelThenToAddThen, node: addThen });
  addThen.prev.push({ edge: labelThenToAddThen, node: labelThen });

  labelElse.next.push({ edge: labelElseToAddElse, node: addElse });
  addElse.prev.push({ edge: labelElseToAddElse, node: labelElse });

  const nodesThen = element.then.map((n) => {
    return elementView(n, options);
  });

  const nodesElse = element.else.map((n) => {
    return elementView(n, options);
  });

  connect(
    [addThen, ...nodesThen, addNext],
    (top, bottom): TypedFlowEdge => ({
      id: `${top.id}-${bottom.id}`,
      entity: { type: "line", data: {} },
      length:
        bottom === addNext
          ? constants.workflow.edge.md
          : constants.workflow.edge.sm,
      source: top,
      target: bottom,
    }),
  );

  connect(
    [addElse, ...nodesElse, addNext],
    (top, bottom): TypedFlowEdge => ({
      id: `${top.id}-${bottom.id}`,
      entity: { type: "line", data: {} },
      length:
        bottom === addNext
          ? constants.workflow.edge.md
          : constants.workflow.edge.sm,
      source: top,
      target: bottom,
    }),
  );

  return [block, addNext];
}

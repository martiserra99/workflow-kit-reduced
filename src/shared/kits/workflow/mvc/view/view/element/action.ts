import { constants } from "@/constants";

import type { ActionFlow } from "@/shared/kits/workflow/mvc/model/workflow";
import type {
  TypedFlowNode,
  TypedFlowEdge,
  TypedFlowComponent,
} from "@/shared/kits/workflow/mvc/view/types/flow";

import type { Options } from "../types";

import { isSelected } from "../utils";

export function actionView(
  element: ActionFlow,
  options: Options,
): [TypedFlowNode, TypedFlowNode] {
  const block: TypedFlowComponent = {
    id: `${element.id}/block`,
    type: "component",
    entity: {
      type: "elementType/action/block",
      meta: {
        type: "elementType",
        elementType: "action",
        item: "block",
        id: element.id,
      },
      data: {
        text: element.message,
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
      next: 0,
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
      type: "elementType/action/addNext",
      meta: {
        type: "elementType",
        elementType: "action",
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

  const blockToAddNext: TypedFlowEdge = {
    id: `${block.id}-${addNext.id}`,
    entity: { type: "line", data: {} },
    length: constants.workflow.edge.sm,
    source: block,
    target: addNext,
  };

  block.next.push({ edge: blockToAddNext, node: addNext });
  addNext.prev.push({ edge: blockToAddNext, node: block });

  return [block, addNext];
}

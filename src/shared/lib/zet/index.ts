import type { Values, Change, Narrow, Nested } from "./utility-types";

export type Params = {
  object: unknown;
  nested: PropertyKey[];
  filter: PropertyKey[];
  params: unknown[];
  return: unknown;
};

export type Refine<
  T extends {
    object: unknown;
    nested: PropertyKey[];
    filter: PropertyKey[];
    narrow: unknown;
  },
> = Change<
  T["object"],
  T["nested"],
  Narrow<Nested<T["object"], T["nested"]>, T["filter"], T["narrow"]>
>;

type Handlers<
  T,
  U extends PropertyKey[],
  V extends PropertyKey[],
  W extends unknown[],
  X,
> =
  Values<T, [...U, ...V]> extends PropertyKey
    ? {
        [K in Values<T, [...U, ...V]>]: (
          value: Refine<{
            object: T;
            nested: U;
            filter: V;
            narrow: K;
          }>,
          ...args: W
        ) => X;
      }
    : never;

/**
 * Creates a function that selects the right handler for an object based on a specific nested value inside it.
 *
 * For full documentation, see:
 * https://www.workflowkit.app/getting-started/utilities/type-based-execution
 *
 * @template T An object containing:
 *   - `object`: The input object.
 *   - `nested`: The path to the property that contains the union you want to narrow.
 *   - `filter`: The path to the key in the union whose value determines which handler to use.
 *   - `params`: Extra arguments to pass to the returned function.
 *   - `return`: The return type of the returned function.
 *
 * @param nested The path to the property that contains the union you want to narrow.
 * @param filter The path to the key in the union whose value determines which handler to use.
 * @param handlers An object where each property points to the handler function that should run.
 *
 * @returns A function that takes an object and optional parameters, and calls the correct handler based on the value found at the specified key.
 */
export function zet<T extends Params>(
  nested: T["nested"],
  filter: T["filter"],
  handlers: Handlers<
    T["object"],
    T["nested"],
    T["filter"],
    T["params"],
    T["return"]
  >,
): (value: T["object"], ...args: T["params"]) => T["return"] {
  return (value: T["object"], ...args: T["params"]): T["return"] => {
    const path: PropertyKey[] = [...nested, ...filter];

    const key = path.reduce((acc, key) => {
      const object = acc as object;
      const property = key as keyof typeof object;
      return object[property];
    }, value) as keyof typeof handlers;

    const handler = handlers[key] as (
      value: Refine<{
        object: T["object"];
        nested: T["nested"];
        filter: T["filter"];
        narrow: typeof key;
      }>,
      ...args: T["params"]
    ) => T["return"];

    return handler(
      value as Refine<{
        object: T["object"];
        nested: T["nested"];
        filter: T["filter"];
        narrow: typeof key;
      }>,
      ...args,
    );
  };
}

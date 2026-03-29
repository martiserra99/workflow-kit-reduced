/**
 * Retrieves the value type located at a given path within a union of object types.
 *
 * @template T A union of objects to inspect.
 * @template U A tuple describing the path of keys.
 *
 * @example
 * type Example = Values<{ a: { b: 0 } } | { a: { b: 1 } }, ["a", "b"]>; // 0 | 1
 */
export type Values<T, U> = U extends [infer V, ...infer W]
  ? V extends keyof T
    ? Values<T[V], W>
    : never
  : T;

/**
 * Replaces the type of a nested property inside an object, using a path of keys to locate it.
 *
 * @template T The original object type.
 * @template U A tuple of keys indicating the nested property to update.
 * @template V The new type to assign at the specified path.
 *
 * @example
 * type Example = Change<{ a: { b: string } }, ["a", "b"], boolean>; // { a: { b: boolean } }
 */
export type Change<T, U, V> = U extends [infer W, ...infer X]
  ? W extends keyof T
    ? { [K in keyof T]: K extends W ? Change<T[W], X, V> : T[K] }
    : never
  : V;

/**
 * Filters a union of objects, keeping only those where a nested value at a given path matches a specified type.
 *
 * @template T A union of objects to filter.
 * @template U A tuple representing the property path.
 * @template V The value type that must appear at the given path.
 *
 * @example
 * type Example = Narrow<{ a: { b: 0 } } | { a: { b: 1 } }, ["a", "b"], 0>; // { a: { b: 0 } }
 */
export type Narrow<T, U, V> = Extract<T, Schema<U, V>>;

/**
 * Builds a nested object type from a tuple of keys, ending in a provided value type.
 *
 * @template T A tuple of keys describing the object structure.
 * @template U The final value type placed at the deepest level.
 *
 * @example
 * type Example = Schema<["a", "b"], 0>; // { a: { b: 0 } }
 */
export type Schema<T, U> = T extends [infer V, ...infer W]
  ? V extends PropertyKey
    ? { [K in V]: Schema<W, U> }
    : never
  : U;

/**
 * Retrieves the nested value type within an object at the specified key path.
 *
 * @template T The object type to inspect.
 * @template U A tuple of keys describing the path.
 *
 * @example
 * type Example = Nested<{ a: { b: { c: number } } }, ["a", "b"]>; // { c: number }
 */
export type Nested<T, U> = U extends [infer V, ...infer W]
  ? V extends keyof T
    ? Nested<T[V], W>
    : never
  : T;

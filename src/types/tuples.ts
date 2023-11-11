/**
 * Merge (union) sequentially all elements of the tuple.
 * `MergeTuples<[string, number] | [boolean, bigint]>` = `[string | boolean, number | bigint]`.
 */
export type MergeTuples<Tuples extends unknown[]> = [Tuples] extends [[]]
  ? []
  : [Tuples[0], ...MergeTuples<TupleRest<Tuples>>];

/**
 * Returns rest of tuple (everything but the first element).
 * `TupleRest<[]>` = `never`.
 * `TupleRest<[1]>` = `[]`.
 * `TupleRest<[1, 2, 3]>` = `[2, 3]`.
 */
export type TupleRest<Type extends unknown[]> = Type extends [unknown, ...infer Result]
  ? Result
  : never;

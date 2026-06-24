/** Discriminated union tag for the Ok variant */
const OK = "Ok" as const;
/** Discriminated union tag for the Err variant */
const ERR = "Err" as const;

/** Represents a successful outcome holding a value of type T */
export interface Ok<T> {
	readonly _tag: typeof OK;
	readonly value: T;
}

/** Represents a failed outcome holding an error of type E */
export interface Err<E> {
	readonly _tag: typeof ERR;
	readonly error: E;
}

/** A value that is either Ok<T> (success) or Err<E> (failure) */
export type Result<T, E = Error> = Ok<T> | Err<E>;

// ---------------------------------------------------------------------------
// 2. Constructors
// ---------------------------------------------------------------------------

/** Create a successful Result */
export const ok = <T>(value: T): Ok<T> => Object.freeze({ _tag: OK, value });

/** Create a failed Result */
export const err = <E>(error: E): Err<E> => Object.freeze({ _tag: ERR, error });

// ---------------------------------------------------------------------------
// 3. Type Guards
// ---------------------------------------------------------------------------

/** Narrows a Result to its Ok branch */
export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> =>
	result._tag === OK;

/** Narrows a Result to its Err branch */
export const isErr = <T, E>(result: Result<T, E>): result is Err<E> =>
	result._tag === ERR;

// ---------------------------------------------------------------------------
// 4. Core Transformations
// ---------------------------------------------------------------------------

/**
 * Transform the success value while leaving errors untouched.
 * @example map(ok(2), x => x * 3)  // Ok(6)
 * @example map(err("oops"), x => x * 3)  // Err("oops")
 */
export const map = <T, U, E>(
	result: Result<T, E>,
	fn: (value: T) => U,
): Result<U, E> => (isOk(result) ? ok(fn(result.value)) : result);

/**
 * Transform the error while leaving success values untouched.
 * @example mapErr(err("oops"), e => new Error(e))  // Err(Error("oops"))
 */
export const mapErr = <T, E, F>(
	result: Result<T, E>,
	fn: (error: E) => F,
): Result<T, F> => (isErr(result) ? err(fn(result.error)) : result);

/**
 * Chain Results — flatMap / bind / andThen.
 * Runs `fn` only when the result is Ok, flattening one level of nesting.
 * @example flatMap(ok(2), x => ok(x * 3))   // Ok(6)
 * @example flatMap(ok(2), _ => err("boom"))  // Err("boom")
 * @example flatMap(err("nope"), x => ok(x))  // Err("nope")
 */
export const flatMap = <T, U, E>(
	result: Result<T, E>,
	fn: (value: T) => Result<U, E>,
): Result<U, E> => (isOk(result) ? fn(result.value) : result);

/** Alias for flatMap — matches Rust / fp-ts naming conventions */
export const andThen = flatMap;

/**
 * Recover from an error by returning a new Result.
 * @example orElse(err("bad"), e => ok(`fixed: ${e}`))  // Ok("fixed: bad")
 */
export const orElse = <T, E, F>(
	result: Result<T, E>,
	fn: (error: E) => Result<T, F>,
): Result<T, F> => (isErr(result) ? fn(result.error) : result);

// ---------------------------------------------------------------------------
// 5. Unwrapping / Extracting
// ---------------------------------------------------------------------------

/**
 * Unwrap the success value or throw.
 * @throws The contained error if the result is Err
 */
export const unwrap = <T, E>(result: Result<T, E>): T => {
	if (isOk(result)) return result.value;
	throw result.error instanceof Error
		? result.error
		: new Error(`Result.unwrap called on Err: ${String(result.error)}`);
};

/**
 * Unwrap with a custom error message on failure.
 */
export const expect = <T, E>(result: Result<T, E>, message: string): T => {
	if (isOk(result)) return result.value;
	throw new Error(`${message}: ${String(result.error)}`);
};

/**
 * Return the success value or a fallback default.
 * @example unwrapOr(err("oops"), 42)  // 42
 */
export const unwrapOr = <T, E>(result: Result<T, E>, defaultValue: T): T =>
	isOk(result) ? result.value : defaultValue;

/**
 * Return the success value or compute a fallback from the error.
 * @example unwrapOrElse(err("oops"), e => e.length)  // 4
 */
export const unwrapOrElse = <T, E>(
	result: Result<T, E>,
	fn: (error: E) => T,
): T => (isOk(result) ? result.value : fn(result.error));

/**
 * Return the success value or `undefined` (safe, no throw).
 * Useful for optional chaining: `toOption(result)?.name`
 */
export const toOption = <T, E>(result: Result<T, E>): T | undefined =>
	isOk(result) ? result.value : undefined;

// ---------------------------------------------------------------------------
// 6. Pattern Matching
// ---------------------------------------------------------------------------

export interface MatchHandlers<T, E, R> {
	ok: (value: T) => R;
	err: (error: E) => R;
}

/**
 * Exhaustively match both variants — the Result equivalent of a switch.
 * @example
 * match(result, {
 *   ok:  value => `Success: ${value}`,
 *   err: error => `Failure: ${error}`,
 * })
 */
export const match = <T, E, R>(
	result: Result<T, E>,
	handlers: MatchHandlers<T, E, R>,
): R => (isOk(result) ? handlers.ok(result.value) : handlers.err(result.error));

// ---------------------------------------------------------------------------
// 7. Collection Utilities
// ---------------------------------------------------------------------------

/**
 * Collect an array of Results into a single Result of an array.
 * Returns the *first* Err encountered, short-circuiting the rest.
 * @example all([ok(1), ok(2), ok(3)])      // Ok([1, 2, 3])
 * @example all([ok(1), err("oops"), ok(3)]) // Err("oops")
 */
export const all = <T, E>(results: Result<T, E>[]): Result<T[], E> => {
	const values: T[] = [];
	for (const r of results) {
		if (isErr(r)) return r;
		values.push(r.value);
	}
	return ok(values);
};

/**
 * Like `all`, but collects *all* errors instead of short-circuiting.
 * @example allSettled([ok(1), err("a"), err("b")])
 * // { oks: [1], errs: ["a", "b"] }
 */
export const allSettled = <T, E>(
	results: Result<T, E>[],
): { oks: T[]; errs: E[] } => {
	const oks: T[] = [];
	const errs: E[] = [];
	for (const r of results) {
		if (isOk(r)) oks.push(r.value);
		else errs.push(r.error);
	}
	return { oks, errs };
};

/**
 * Return the first Ok in the array, or the last Err if all fail.
 * @example any([err("a"), ok(2), ok(3)])  // Ok(2)
 * @example any([err("a"), err("b")])      // Err("b")
 */
export const any = <T, E>(results: Result<T, E>[]): Result<T, E> => {
	let lastErr: Err<E> | undefined;
	for (const r of results) {
		if (isOk(r)) return r;
		lastErr = r;
	}
	return lastErr ?? err(undefined as unknown as E);
};

/**
 * Partition an array of Results into two typed arrays.
 * @example partition([ok(1), err("a"), ok(2)])
 * // { oks: [1, 2], errs: ["a"] }
 */
export const partition = <T, E>(
	results: Result<T, E>[],
): { oks: T[]; errs: E[] } => allSettled(results);

// ---------------------------------------------------------------------------
// 8. Async Utilities
// ---------------------------------------------------------------------------

/** A Result wrapped in a Promise — the standard async return type */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

/**
 * Wrap an async function so it always returns AsyncResult<T, E>
 * instead of throwing. The thrown value is passed through `onError`.
 *
 * @example
 * const safeFetch = tryCatchAsync(
 *   () => fetch("/api/data").then(r => r.json()),
 *   (e): ApiError => ({ code: 500, message: String(e) })
 * );
 * const result = await safeFetch();
 */
export const tryCatchAsync =
	<T, E = Error>(
		fn: () => Promise<T>,
		onError: (thrown: unknown) => E = (e) => e as E,
	): (() => AsyncResult<T, E>) =>
	async () => {
		try {
			return ok(await fn());
		} catch (thrown) {
			return err(onError(thrown));
		}
	};

/**
 * Wrap a synchronous function so it always returns Result<T, E>
 * instead of throwing.
 *
 * @example
 * const safeParseInt = tryCatch(
 *   (s: string) => {
 *     const n = parseInt(s, 10);
 *     if (isNaN(n)) throw new Error(`"${s}" is not a number`);
 *     return n;
 *   },
 *   (e) => e as Error
 * );
 * safeParseInt("42");   // Ok(42)
 * safeParseInt("abc");  // Err(Error)
 */
export const tryCatch = <T, E = Error>(
	fn: () => T,
	onError: (thrown: unknown) => E = (e) => e as E,
): Result<T, E> => {
	try {
		return ok(fn());
	} catch (thrown) {
		return err(onError(thrown));
	}
};

/**
 * Async map — transform the success value of an AsyncResult.
 */
export const mapAsync = async <T, U, E>(
	result: AsyncResult<T, E>,
	fn: (value: T) => Promise<U> | U,
): AsyncResult<U, E> => {
	const r = await result;
	if (isErr(r)) return r;
	return ok(await fn(r.value));
};

/**
 * Async flatMap — chain AsyncResults.
 */
export const flatMapAsync = async <T, U, E>(
	result: AsyncResult<T, E>,
	fn: (value: T) => AsyncResult<U, E>,
): AsyncResult<U, E> => {
	const r = await result;
	if (isErr(r)) return r;
	return fn(r.value);
};

// ---------------------------------------------------------------------------
// 9. JSON Serialization
// ---------------------------------------------------------------------------

/** Serialized form of a Result for storage / transport */
export type SerializedResult<T, E> =
	| { ok: true; value: T }
	| { ok: false; error: E };

/** Serialize a Result to a plain object safe for JSON.stringify */
export const serialize = <T, E>(
	result: Result<T, E>,
): SerializedResult<T, E> =>
	isOk(result)
		? { ok: true, value: result.value }
		: { ok: false, error: result.error };

/** Deserialize a plain object back into a Result */
export const deserialize = <T, E>(
	serialized: SerializedResult<T, E>,
): Result<T, E> =>
	serialized.ok ? ok(serialized.value) : err(serialized.error);

// ---------------------------------------------------------------------------
// 10. Object / Record Utilities
// ---------------------------------------------------------------------------

/**
 * Transform a record of Results into a Result of a record.
 * All values must succeed; the first Err short-circuits.
 *
 * @example
 * allRecord({ name: ok("Alice"), age: ok(30) })
 * // Ok({ name: "Alice", age: 30 })
 */
export const allRecord = <T extends Record<string, unknown>, E>(record: {
	[K in keyof T]: Result<T[K], E>;
}): Result<T, E> => {
	const out = {} as T;
	for (const key of Object.keys(record) as (keyof T)[]) {
		const r = record[key];
		if (isErr(r)) return r;
		out[key] = r.value;
	}
	return ok(out);
};

// ---------------------------------------------------------------------------
// 11. Fluent / Builder API (optional ergonomic wrapper)
// ---------------------------------------------------------------------------

/**
 * A chainable wrapper around Result<T, E>.
 * Useful when you prefer method-chaining over free functions.
 *
 * @example
 * ResultBuilder.of(ok(5))
 *   .map(x => x * 2)
 *   .flatMap(x => x > 5 ? ok(x) : err("too small"))
 *   .match({ ok: v => `value: ${v}`, err: e => `error: ${e}` });
 */
export class ResultBuilder<T, E> {
	private constructor(private readonly _result: Result<T, E>) {}

	static of<T, E>(result: Result<T, E>): ResultBuilder<T, E> {
		return new ResultBuilder(result);
	}

	static ok<T>(value: T): ResultBuilder<T, never> {
		return new ResultBuilder(ok(value));
	}

	static err<E>(error: E): ResultBuilder<never, E> {
		return new ResultBuilder(err(error));
	}

	map<U>(fn: (value: T) => U): ResultBuilder<U, E> {
		return ResultBuilder.of(map(this._result, fn));
	}

	mapErr<F>(fn: (error: E) => F): ResultBuilder<T, F> {
		return ResultBuilder.of(mapErr(this._result, fn));
	}

	flatMap<U>(fn: (value: T) => Result<U, E>): ResultBuilder<U, E> {
		return ResultBuilder.of(flatMap(this._result, fn));
	}

	orElse<F>(fn: (error: E) => Result<T, F>): ResultBuilder<T, F> {
		return ResultBuilder.of(orElse(this._result, fn));
	}

	match<R>(handlers: MatchHandlers<T, E, R>): R {
		return match(this._result, handlers);
	}

	unwrap(): T {
		return unwrap(this._result);
	}

	unwrapOr(defaultValue: T): T {
		return unwrapOr(this._result, defaultValue);
	}

	unwrapOrElse(fn: (error: E) => T): T {
		return unwrapOrElse(this._result, fn);
	}

	toOption(): T | undefined {
		return toOption(this._result);
	}

	serialize(): SerializedResult<T, E> {
		return serialize(this._result);
	}

	get result(): Result<T, E> {
		return this._result;
	}

	get isOk(): boolean {
		return isOk(this._result);
	}

	get isErr(): boolean {
		return isErr(this._result);
	}
}

// ---------------------------------------------------------------------------
// 12. Validation Helper
// ---------------------------------------------------------------------------

export type ValidationError = { field: string; message: string };

/**
 * Accumulate multiple validation Results into one, collecting all errors
 * rather than short-circuiting on the first failure.
 *
 * @example
 * validate([
 *   name.length > 0   ? ok(name)  : err({ field: "name",  message: "required" }),
 *   age >= 18         ? ok(age)   : err({ field: "age",   message: "must be 18+" }),
 * ]);
 * // Err([{ field: "name", message: "required" }, ...])
 */
export const validate = <T>(
	results: Result<T, ValidationError>[],
): Result<T[], ValidationError[]> => {
	const { oks, errs } = allSettled(results);
	return errs.length > 0 ? err(errs) : ok(oks);
};

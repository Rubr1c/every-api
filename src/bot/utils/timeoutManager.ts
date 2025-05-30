/**
 * @module bot/utils/timeoutManager
 *
 * TimeoutManager class that handles timeouts.
 * 
 *
 * Exports:
 *  - TimeoutManager
 *
 * @author Ali Zaghloul
 * @license MIT
 */

/**
 * A generic timeout manager that allows tracking timeouts for arbitrary keys.
 *
 * Useful for rate-limiting actions, debouncing, or managing cooldowns per key.
 *
 * @template K - The type used as the key for timeouts (e.g., string, number, user ID).
 *
 * @example
 * const manager = new TimeoutManager<string>(5000);
 * manager.timeout("user123");
 * 
 * if (manager.isTimedout("user123")) {
 *   console.log("Still in timeout.");
 * }
 */
export class TimeoutManager<K> {
  /**
   * Internal map to store timeouts by key.
   */
  private timeoutMap: Map<K, NodeJS.Timeout>;

  /**
   * Timeout duration in milliseconds.
   */
  private duration: number;

  /**
   * Creates a new TimeoutManager instance.
   *
   * @param duration 
   *   Timeout duration in milliseconds.
   */
  constructor(duration: number) {
    this.timeoutMap = new Map();
    this.duration = duration;
  }

  /**
   * Sets a new timeout duration.
   *
   * @param duration 
   *   The new timeout duration in milliseconds.
   */
  setDuration(duration: number) {
    this.duration = duration;
  }

  /**
   * Starts or resets the timeout for a given key.
   *
   * If a timeout already exists for the key, it will be cleared and replaced.
   * After the duration passes, the key is automatically removed from the map.
   *
   * @param key 
   *   The key to track the timeout for.
   */
  timeout(key: K) {
    if (this.timeoutMap.has(key)) {
      clearTimeout(this.timeoutMap.get(key));
    }

    const timeout = setTimeout(() => {
      this.timeoutMap.delete(key);
    }, this.duration);

    this.timeoutMap.set(key, timeout);
  }

  /**
   * Checks whether a timeout is currently active for the given key.
   *
   * @param key 
   *   The key to check.
   * @returns 
   *   `true` if the key is still in timeout, otherwise `false`.
   */
  isTimedout(key: K): boolean {
      return this.timeoutMap.has(key);
  }
}

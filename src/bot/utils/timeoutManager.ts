export class TimeoutManager<K> {
  private timeoutMap: Map<K, NodeJS.Timeout>;
  private duration: number;

  constructor(duration: number) {
    this.timeoutMap = new Map();
    this.duration = duration;
  }

  setDuration(duration: number) {
    this.duration = duration;
  }

  timeout(key: K) {
    if (this.timeoutMap.has(key)) {
      clearTimeout(this.timeoutMap.get(key));
    }

    const timeout = setTimeout(() => {
      this.timeoutMap.delete(key);
    }, this.duration);

    this.timeoutMap.set(key, timeout);
  }

  isTimedout(key: K): boolean {
      return this.timeoutMap.has(key);
  }
}

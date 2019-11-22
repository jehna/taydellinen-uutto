export function throttle<T extends Array<any>>(
  timeMs: number,
  callback: (...args: T) => void
): (...args: T) => void {
  let lastCalled = -1
  return (...args) => {
    if (Date.now() > lastCalled + timeMs) {
      lastCalled = Date.now()
      callback(...args)
    }
  }
}

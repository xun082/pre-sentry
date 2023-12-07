import type { IAnyObject } from "@pref-sentry/types";

/**
 * 生成UUID
 * @return {string}  {string}
 */
export function generateUUID(): string {
  let d = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

/**
 * 格式化日期时间
 * @param {string} format
 * @param {number} timestamp - 时间戳
 * @return {string}
 */
export const formatDate = (
  format: string = "Y-M-D h:m:s",
  timestamp: number = Date.now(),
): string => {
  const date = new Date(timestamp);
  const formatNumber = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

  const replacements = {
    Y: date.getFullYear().toString(),
    M: formatNumber(date.getMonth() + 1),
    D: formatNumber(date.getDate()),
    h: formatNumber(date.getHours()),
    m: formatNumber(date.getMinutes()),
    s: formatNumber(date.getSeconds()),
  };

  return format.replace(/Y|M|D|h|m|s/g, match => replacements[match]);
};

/**
 * 函数节流
 *
 * @export
 * @param {Function} fn 需要节流的函数
 * @param {number} delay 节流的时间间隔
 * @return {*}  {Function} 返回一个包含节流功能的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  options: { leading?: boolean; trailing?: boolean } = {},
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let lastCallTimer: number | null = null;
  let result: any;

  const { leading = true, trailing = true } = options;

  const throttled = function (...args: Parameters<T>): any {
    const now = new Date().getTime();

    if (lastCall === 0 && !leading) {
      lastCall = now;
    }

    const remaining = delay - (now - lastCall);

    if (remaining <= 0 || remaining > delay) {
      if (lastCallTimer) {
        clearTimeout(lastCallTimer);
        lastCallTimer = null;
      }
      lastCall = now;
      result = fn.apply(this, args);
    } else if (!lastCallTimer && trailing) {
      lastCallTimer = window.setTimeout(() => {
        lastCall = leading ? new Date().getTime() : 0;
        lastCallTimer = null;
        result = fn.apply(this, args);
      }, remaining);
    }

    return result;
  };

  throttled.cancel = function () {
    if (lastCallTimer) {
      clearTimeout(lastCallTimer);
    }
    lastCall = 0;
    lastCallTimer = null;
  };

  return throttled;
}

/**
 * 重写对象上面的某个属性
 *
 * @export
 * @param {IAnyObject} source 需要被重写的对象
 * @param {string} name 需要被重写对象的key
 * @param {(...args: any[]) => any} replacement 以原有的函数作为参数，执行并重写原有函数
 * @param {boolean} isForced 是否强制重写（可能原先没有该属性）
 */
export function replaceOld<T extends IAnyObject, K extends keyof T>(
  source: T,
  name: K,
  replacement: (original: T[K]) => T[K],
  isForced?: boolean,
): void {
  if (source === undefined) return;
  if (name in source || isForced) {
    const original = source[name];
    const wrapped = replacement(original);
    if (typeof wrapped === "function") {
      source[name] = wrapped;
    }
  }
}

/**
 * 保留指定位数的小数
 * @param num 原数据
 * @param decimal 小数位数
 * @returns
 */
export function formatDecimal(num: number, decimal: number): number {
  if (!num) {
    return num;
  }
  let str = num.toString();
  const index = str.indexOf(".");
  if (index !== -1) {
    str = str.substring(0, decimal + index + 1);
  } else {
    str = str.substring(0);
  }
  return parseFloat(str);
}

/**
 * 计算字符串大小
 * @param str
 * @returns 字节
 */
export function countBytes(str: string): number {
  const encoder = new TextEncoder();
  return encoder.encode(str).length;
}

/**
 * 根据字节大小拆分字符串
 * @param str
 * @param maxBytes 最大字节数
 * @returns
 */
export function splitStringByBytes(str: string, maxBytes: number): Array<string> {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  const decoder = new TextDecoder();
  const chunks = [];
  let start = 0;
  while (start < bytes.length) {
    let end = start + maxBytes;
    while (end > start && (bytes[end] & 0xc0) === 0x80) {
      end--;
    }
    chunks.push(decoder.decode(bytes.subarray(start, end)));
    start = end;
  }
  return chunks;
}

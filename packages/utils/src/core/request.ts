import type { IAnyObject } from "@pref-sentry/types";
import { MethodTypes } from "@pref-sentry/types";

import { obj2query } from "./base";

/**
 * sendBeacon上传
 * @param {string} url - 接口地址
 * @param {IAnyObject} data - 请求参数
 * @return {boolean}
 */
export function beacon(url: string, data: IAnyObject): boolean {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    // 将所有值转换为字符串
    const valueStr = JSON.stringify(value);
    formData.append(key, valueStr);
  });

  return navigator.sendBeacon(url, formData);
}

/**
 * xhr方式的 get 上传
 * @param {string} url - 接口地址
 * @param {IAnyObject} data - 请求参数
 * @return {Promise}
 */
export function get(url: string, data: IAnyObject): Promise<any> {
  return xhr(MethodTypes.GET, `${url}${url.indexOf("?") === -1 ? "?" : ""}${obj2query(data)}`, "");
}

/**
 * xhr方式的 post 上传
 * @param {string} url - 接口地址
 * @param {IAnyObject} data - 请求参数
 * @return {Promise}
 */
export function post(url: string, data: IAnyObject): Promise<any> {
  return xhr(MethodTypes.POST, url, obj2query(data));
}

/**
 * xhr上传
 * @param {string} url - 接口地址
 * @param {string} data - 请求参数
 * @return {Promise}
 */
export function xhr(method: MethodTypes, url: string, data: any): Promise<any> {
  return new Promise((rs, rj) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      if (method === MethodTypes.POST) {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
      } else {
        xhr.send();
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          rs(JSON.parse(xhr.response));
        } else {
          new Error(xhr.response);
        }
      };
    } catch (error) {
      rj(error);
    }
  });
}

/**
 * 图片方式上传
 * @param {string} url - 接口地址
 * @param {IAnyObject} data - 请求参数
 */
export function imgRequest(url: string, data: IAnyObject): void {
  let img = new Image();
  const spliceStr = url.indexOf("?") === -1 ? "?" : "&";
  img.src = `${url}${spliceStr}data=${encodeURIComponent(JSON.stringify(data))}`;
  img = null;
}

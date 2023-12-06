import { ReportDataMsgType } from "./base";
import { IAnyObject } from "./common";

export interface VueInstance {
  [key: string]: unknown;
  config?: VueConfiguration;
  version: string;
}

export interface ViewModel {
  [key: string]: unknown;
  $root?: Record<string, unknown>;
  $options?: {
    [key: string]: unknown;
    name?: string;
    props?: IAnyObject;
  };
  $props?: Record<string, unknown>;
}

export interface VueConfiguration {
  errorHandler?(err: Error, vm: ViewModel | unknown, info: string): void;
  warnHandler?(msg: string, vm: ViewModel | unknown, trace: string): void;
  [key: string]: unknown;
}

export interface VueReportDataType extends ReportDataMsgType {
  name: string;
  message: string;
  hook: string;
  stack: string;
  lineno?: number;
  colno?: number;
  filename?: string;
}

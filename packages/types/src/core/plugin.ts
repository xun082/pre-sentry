import { ReportDataType } from "./base";
export interface BasePluginType {
  name: string;
  // 监控事件
  monitor: (notify: (data: unknown) => void) => void;
  // 数据格式转换
  transform?: (collectedData: unknown) => ReportDataType<unknown>;
  [key: string]: unknown;
}

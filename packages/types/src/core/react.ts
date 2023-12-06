// 定义 React 组件的 Props 和 State
export interface ReactComponentProps {
  [key: string]: unknown; // 或者具体的属性类型
}

export interface ReactComponentState {
  [key: string]: unknown; // 或者具体的状态类型
}

// 定义 React 组件实例
export interface ReactComponentInstance {
  props: ReactComponentProps;
  state: ReactComponentState;
}

// 定义 React 错误信息
export interface ReactErrorInfo {
  componentStack: string; // 组件的堆栈跟踪信息
}

// 定义 React 错误边界捕获的错误信息
export interface ReactErrorBoundaryInfo {
  error: Error;
  errorInfo: ReactErrorInfo;
  componentInstance?: ReactComponentInstance;
}

// 定义 React 生命周期错误信息
export interface ReactLifecycleErrorInfo {
  lifecycleMethod: string;
  error: Error;
  componentInstance: ReactComponentInstance;
}

// 定义用于监控的 React 应用数据类型
export interface ReactMonitoringData {
  type: "error" | "warning";
  timestamp: number;
  message: string;
  stack?: string;
  componentInfo?: ReactErrorBoundaryInfo | ReactLifecycleErrorInfo;
  extraInfo?: Record<string, unknown>;
}

// 定义 React 钩子错误信息
export interface ReactHookErrorInfo {
  hookName: string;
  error: Error;
  componentInstance?: ReactComponentInstance;
}

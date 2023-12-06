export type VoidFunction = () => void;

export interface IAnyObject {
  [key: string]: unknown;
}

export type UnknownFunc = (...args: unknown[]) => unknown;

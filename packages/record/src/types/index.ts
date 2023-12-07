import { ReportDataMsgType } from "@pref-sentry/types";

export enum RecordTypes {
  SESSION = "session",
}

export interface RecordDataType {
  events: unknown[] | string;
}

export interface RecordMsgType extends ReportDataMsgType, RecordDataType {}

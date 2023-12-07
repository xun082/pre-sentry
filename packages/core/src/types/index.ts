import { AppInfoType } from "@pref-sentry/types";

export interface CoreContextType {
  app: AppInfoType;
  uploadUrl: string;
  initUrl: string;
  debug: boolean;
  enabled: boolean;
}

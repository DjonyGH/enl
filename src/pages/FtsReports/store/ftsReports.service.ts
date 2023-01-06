import { ResultFileType } from "@ff/ui-kit/lib/esm/components/FileUploader/FileUploader.types";

import { TFtsReportList, IFtsReport, INewFtsReport } from "../types";

const service = {
  // region Публичные функции
  async getFtsReportList(): Promise<TFtsReportList> {
    console.warn("getFtsReportList: method not implemented");
    return [];
  },
  async getFtsReportFile(reportId: number): Promise<File | undefined> {
    console.warn("getFtsReportFile: method not implemented", reportId);
    return undefined;
  },
  async postFtsReport(newReport: INewFtsReport): Promise<IFtsReport> {
    console.warn("postFtsReport: method not implemented", newReport);
    return {} as IFtsReport;
  },
  async putFtsReport(report: IFtsReport): Promise<IFtsReport> {
    console.warn("putFtsReport: method not implemented");
    return report as IFtsReport;
  },
  async putFtsReportFile(
    file: ResultFileType,
    reportId: number
  ): Promise<IFtsReport> {
    console.warn("putFtsReportFile: method not implemented", file, reportId);
    return {} as IFtsReport;
  },
};

export default service;

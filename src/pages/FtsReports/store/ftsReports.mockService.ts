import _ from "lodash";
// import apiUserStore from "stores/apiUserStore/apiUserStore";
import ftsReportsStore from "./index";
import { ResultFileType } from "@ff/ui-kit/lib/esm/components/FileUploader/FileUploader.types";

import uploadedReportList from "mocks/ftsReports/data.json";
import {
  EFtsReportStatus,
  IFtsReport,
  TFtsReportList,
  INewFtsReport,
} from "../types";

const pause = (ms: number) => new Promise((res) => setTimeout(res, ms));

const mockService = {
  async getFtsReportList(): Promise<TFtsReportList> {
    const rows = uploadedReportList;
    await pause(1000);
    return rows;
  },
  async postFtsReport(newReport: INewFtsReport): Promise<IFtsReport> {
    // TODO: вернуть, когда реализую userStore
    // const { authData } = apiUserStore;
    await pause(1000);
    return {
      id: _.random(100, 200),
      reportYear: newReport.reportYear,
      uploadedAt: new Date().toISOString(),
      // TODO: вернуть, когда реализую userStore
      // uploadedBy: authData?.fio || "Неизвестный сотрудник",
      uploadedBy: "Неизвестный сотрудник",
      statusId: EFtsReportStatus.relevant,
      fileUrl: "",
    };
  },
  async putFtsReport(report: IFtsReport): Promise<IFtsReport> {
    await pause(1000);
    return {
      ...report,
      statusId: EFtsReportStatus.approved,
    };
  },
  async putFtsReportFile(
    file: ResultFileType,
    reportId: number
  ): Promise<IFtsReport> {
    const { data: reports } = ftsReportsStore;
    // TODO: вернуть, когда реализую userStore
    // const { authData } = apiUserStore;
    await pause(1000);
    return {
      id: reportId,
      reportYear:
        reports.find((row: IFtsReport) => row.id === reportId)?.reportYear || 0,
      uploadedAt: new Date().toISOString(),
      // TODO: вернуть, когда реализую userStore
      // uploadedBy: authData?.fio || "Неизвестный сотрудник",
      uploadedBy: "Неизвестный сотрудник",
      statusId: EFtsReportStatus.relevant,
      fileUrl:
        reports.find((row: IFtsReport) => row.id === reportId)?.fileUrl || "",
    };
  },
};

export default mockService;

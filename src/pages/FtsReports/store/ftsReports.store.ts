import { action, computed, makeObservable, observable } from "mobx";
import { ResultFileType } from "@ff/ui-kit/lib/esm/components/FileUploader/FileUploader.types";

import appStore from "stores/appStore";
import userStore from "stores/userStore";
import service from "./ftsReports.service";
import mockService from "./ftsReports.mockService";
import {
  EFtsReportStatus,
  IFtsReport,
  TFtsReportList,
  INewFtsReport,
} from "../types";

class FtsReportsStore {
  data: TFtsReportList = [];

  pageNum = 1;

  rowsPerPage = 10;

  isOnlyRelevant = false;

  sortValue: keyof IFtsReport = "reportYear";

  availableYears: string[] = [];

  constructor() {
    makeObservable<FtsReportsStore>(this, {
      data: observable,
      pageNum: observable,
      rowsPerPage: observable,
      isOnlyRelevant: observable,
      sortValue: observable,
      availableYears: observable,
      filteredFtsReportList: computed,
      paginatedFtsReportList: computed,
      overallCount: computed,
      loadData: action,
      createFtsReport: action,
      reloadFtsReportFile: action,
      approveFtsReport: action,
      setData: action,
      setPageNum: action,
      setRowsPerPage: action,
      setIsOnlyRelevant: action,
      setSortValue: action,
    });
    this.h_setAvailableYears();
  }

  get filteredFtsReportList(): IFtsReport[] {
    if (this.data.length) {
      let rows = this.data;
      const overallCount = this.data.length;

      if (this.isOnlyRelevant)
        rows = rows.filter(
          (row) => row.statusId !== EFtsReportStatus.noRelevant
        );

      rows = rows.slice().sort((a, b) => {
        if (this.sortValue in a && this.sortValue in b) {
          if (a[this.sortValue] > b[this.sortValue]) return 1;
          if (a[this.sortValue] < b[this.sortValue]) return -1;
          return 0;
        }
        return 0;
      });
      return rows;
    }
    return [];
  }

  get paginatedFtsReportList(): IFtsReport[] {
    if (this.filteredFtsReportList.length) {
      let rows = this.filteredFtsReportList;
      const overallCount = this.filteredFtsReportList.length;

      if (this.rowsPerPage < overallCount) {
        return rows.slice(
          this.rowsPerPage * (this.pageNum - 1),
          this.rowsPerPage * this.pageNum
        );
      }
      return rows;
    }
    return [];
  }

  get overallCount() {
    return this.filteredFtsReportList.length;
  }

  async loadData(): Promise<boolean> {
    const ss =
      !appStore.isPrototype && appStore.featureFlags.ftsReports
        ? service
        : mockService;
    return userStore.doAfterAuth<boolean>((authData) => {
      if (!authData || !authData.accessToken) return Promise.resolve(false);
      return ss
        .getFtsReportList()
        .then((result) => {
          result && this.setData(result);
          return Promise.resolve(true);
        })
        .catch((e) => {
          console.error(e.message);
          return Promise.resolve(false);
        });
    }, false);
  }

  async loadUploadingReportFile(fileId: number): Promise<File | undefined> {
    try {
      return await service.getFtsReportFile(fileId);
    } catch (error: unknown) {
      return undefined;
    }
  }

  async createFtsReport(newReport: INewFtsReport): Promise<boolean> {
    try {
      const ss =
        !appStore.isPrototype && appStore.featureFlags.ftsReports
          ? service
          : mockService;
      const createdReport = await ss.postFtsReport(newReport);
      if (this.data) {
        const newFtsReportList = [...this.data, createdReport];
        this.setData(newFtsReportList);
      }

      return true;
    } catch (error: unknown) {
      return false;
    }
  }

  async reloadFtsReportFile(
    file: ResultFileType,
    reportId: number
  ): Promise<boolean> {
    try {
      const ss =
        !appStore.isPrototype && appStore.featureFlags.ftsReports
          ? service
          : mockService;
      const updatedReport = await ss.putFtsReportFile(file, reportId);

      if (this.data) {
        const rows = this.data.filter((row) => row.id !== reportId);
        const newFtsReportList = [...rows, updatedReport];
        this.setData(newFtsReportList);
      }

      return true;
    } catch (error: unknown) {
      return false;
    }
  }

  async approveFtsReport(report: IFtsReport): Promise<boolean> {
    try {
      const ss =
        !appStore.isPrototype && appStore.featureFlags.ftsReports
          ? service
          : mockService;
      const updatedReport = await ss.putFtsReport(report);

      if (this.data) {
        const rows = this.data.filter((row) => row.id !== report.id);
        const newFtsReportList = [...rows, updatedReport];
        this.setData(newFtsReportList);
      }

      return true;
    } catch (error: unknown) {
      return false;
    }
  }

  setData(data: TFtsReportList) {
    this.data = data;
  }

  setPageNum(value: number) {
    this.pageNum = value;
  }

  setRowsPerPage(value: number) {
    this.rowsPerPage = value;
  }

  setIsOnlyRelevant(value: boolean) {
    this.isOnlyRelevant = value;
  }

  setSortValue(value: string) {
    this.sortValue = value as keyof IFtsReport;
  }

  h_setAvailableYears() {
    const date = new Date().getFullYear();
    const years: string[] = [];
    for (let ii = 2016; ii <= date; ii += 1) {
      years.push(ii.toString());
    }
    this.availableYears = years;
  }
}

export default new FtsReportsStore();

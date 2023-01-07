import { ResultFileType } from "@ff/ui-kit/lib/esm/components/FileUploader/FileUploader.types";

export enum EFtsReportStatus {
  noRelevant = 0,
  relevant = 1,
  approved = 2,
}

export interface IFtsReport {
  id: number;
  reportYear: number;
  uploadedAt: string;
  uploadedBy: string;
  statusId: EFtsReportStatus;
  fileUrl: string;
}

export type TFtsReportList = IFtsReport[];

export interface INewFtsReport {
  reportYear: number;
  file: ResultFileType;
}

export enum ESortValue {
  reportYear = "Отчетному году",
  uploadedAt = "Дате и времени",
  uploadedBy = "Кто загрузил",
}

export enum EModalMode {
  uploading = 0,
  reloading = 1,
}

export enum EModalState {
  editing = 0,
  success = 1,
  error = 2,
}

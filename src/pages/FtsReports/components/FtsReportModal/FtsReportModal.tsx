import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Modal,
  ResultFilesObjectType,
  TextField,
  FileUploader,
  Select,
  Option,
  Spinner,
} from "@ff/ui-kit";
import cn from "classnames";

import styles from "./FtsReportModal.module.scss";
import { EModalMode, EModalState, IFtsReport } from "pages/FtsReports/types";
import ftsReportsStore from "pages/FtsReports/store/ftsReports.store";

type TProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  mode: EModalMode;
  selectedReport?: IFtsReport;
};

const UploadedReportModal: React.FC<TProps> = ({
  visible,
  setVisible,
  mode,
  selectedReport,
}) => {
  const [modalState, setModalState] = useState<EModalState>(
    EModalState.editing
  );
  const [files, setFiles] = useState<ResultFilesObjectType | undefined>();
  const [reportYear, setReportYear] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setReportYear(selectedReport ? `${selectedReport.reportYear}` : undefined);
  }, [selectedReport]);

  const getFileName = () => {
    if (files)
      return Array.isArray(files) ? files[0]?.name : Object.keys(files)[0];
    return "Файл не выбран";
  };

  const fnReset = () => {
    setFiles(undefined);
    if (!selectedReport) setReportYear(undefined);
    setModalState(EModalState.editing);
  };
  const fnUpload: (files: File[] | ResultFilesObjectType) => void = (
    uploadedFiles
  ) => {
    setFiles(uploadedFiles as ResultFilesObjectType);
  };

  const fnApply = async () => {
    if (files && reportYear) {
      setIsLoading(true);
      const file = files[Object.keys(files)[0]];
      let success;
      if (mode === EModalMode.uploading) {
        success = await ftsReportsStore.createFtsReport({
          reportYear: +reportYear,
          file,
        });
      }
      if (mode === EModalMode.reloading && selectedReport) {
        success = await ftsReportsStore.reloadFtsReportFile(
          file,
          selectedReport?.id
        );
      }
      setIsLoading(false);
      if (success) setModalState(EModalState.success);
      else setModalState(EModalState.error);
    }
  };

  const fnClose = () => {
    fnReset();
    setVisible(false);
  };

  const years: Option[] = useMemo(
    () =>
      ftsReportsStore.availableYears.map((year, idx) => ({
        key: idx,
        value: year,
        label: year,
      })),
    [ftsReportsStore.availableYears]
  ); // eslint-disable-line

  const fnChangeReportYear: (value: string | string[]) => void = (value) => {
    setReportYear(value as string);
  };

  const editingJSX: JSX.Element = (
    <>
      <div className={cn(styles.fileUploader, "mb-4")}>
        <TextField
          className={styles.fileName}
          name="medium"
          label="Выбрать файл отчета"
          placeholder={getFileName()}
        />
        <FileUploader
          className={styles.uploadBtn}
          accept="image/*, .zip, application/pdf"
          onChange={fnUpload}
          maxFileSizeInBytes={10000000000000}
          variant="button"
          buttonProps={{ size: "small" }}
          value={files}
          fileType="Object"
        />
      </div>
      <Select
        className={cn(styles.reportYearChooser, "demo-select")}
        name="label-left-select"
        label="Отчетный год"
        labelPosition="top"
        placeholder="Выберите"
        options={years}
        size="medium"
        onChange={fnChangeReportYear}
        value={reportYear}
        disabled={!!selectedReport}
      />
    </>
  );

  const successJSX: JSX.Element = (
    <span className={styles.success}>Файл отчета успешно загружен.</span>
  );

  const errorJSX: JSX.Element = (
    <span className={styles.error}>Файл отчета не загружен.</span>
  );

  const modalContent: JSX.Element = (
    <div className={styles.modalContent}>
      <div className={styles.modalBody}>
        {modalState === EModalState.editing && editingJSX}
        {modalState === EModalState.success && successJSX}
        {modalState === EModalState.error && errorJSX}
      </div>
      <div className={styles.modalControls}>
        {modalState === EModalState.editing && (
          <Button
            type="basic"
            size="medium"
            onClick={fnReset}
            disabled={!(files || (reportYear && mode === EModalMode.uploading))}
          >
            Сбросить
          </Button>
        )}
        <div className={styles.leftPart}>
          {modalState === EModalState.editing && (
            <Button
              type="primary"
              size="medium"
              onClick={fnApply}
              disabled={
                !files || (!reportYear && mode === EModalMode.uploading)
              }
            >
              Применить
            </Button>
          )}
          <Button className="ml-1" type="basic" size="medium" onClick={fnClose}>
            {modalState === EModalState.editing ? "Отменить" : "Закрыть"}
          </Button>
        </div>
      </div>
    </div>
  );

  const getTitle = () => {
    if (mode === EModalMode.uploading) {
      return modalState === EModalState.editing
        ? "Загрузить отчет"
        : "Результат загрузки отчета";
    }
    return modalState === EModalState.editing
      ? "Перезагрузить файл"
      : "Результат загрузки файла";
  };

  return (
    <Modal
      className="pre-line"
      anchor="root"
      visible={visible}
      onClose={fnClose}
      title={getTitle()}
      width={640}
    >
      {isLoading ? (
        <Spinner
          size="large"
          description="Загрузка..."
          className={styles.loader}
        >
          {modalContent}
        </Spinner>
      ) : (
        modalContent
      )}
    </Modal>
  );
};

export default UploadedReportModal;

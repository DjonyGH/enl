import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import appStore from "stores/appStore";
import { EModalMode, IFtsReport } from "./types";
import ftsReportsStore from "./store/ftsReports.store";
import styles from "./ftsReports.module.scss";
import classNames from "classnames";
import Preloader from "components/Preloader";
import { Button, Checkbox, Option, Pagination, Select } from "@ff/ui-kit";
import FtsReportCardList from "./components/FtsReportCardList";
import FtsReportModal from "./components/FtsReportModal";
import UnderTableSummary from "components/UnderTableSummary";

const FtsReports: React.FC = observer(() => {
  console.log("FtsReports render");
  const { isTableMaximized } = appStore;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<EModalMode>(EModalMode.uploading);
  const [selectedReport, setSelectedReport] = useState<
    IFtsReport | undefined
  >();

  useEffect(() => {
    setIsLoaded(false);
    ftsReportsStore.loadData().then(() => setIsLoaded(true));
  }, []);

  const cnMax = isTableMaximized
    ? classNames(styles.component, "template-step", "template-step_max")
    : classNames(styles.component, "template-step");

  const title = "Загруженные отчеты";

  const options: Option[] = [
    { key: 1, value: "reportYear", label: "Отчетному году" },
    { key: 2, value: "uploadedAt", label: "Дате и времени" },
    { key: 3, value: "uploadedBy", label: "Кто загрузил" },
  ];

  const toggleRelevant: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    ftsReportsStore.setIsOnlyRelevant(event.target.checked);
  };

  const fnSort: (value: string | string[]) => void = (value) => {
    if (!Array.isArray(value)) ftsReportsStore.setSortValue(value);
  };

  const fnUploadReport: () => void = () => {
    setSelectedReport(undefined);
    setModalMode(EModalMode.uploading);
    setModalVisible(true);
  };

  return (
    <>
      {!isLoaded && <Preloader />}
      <div className={cnMax}>
        <div className="template-page overflow-hidden">
          <div className="template-page__container">
            <div className="row row32 align-items-center">
              <div className="col">
                <div className="template-common__title">{title}</div>
              </div>
            </div>

            <div
              className={classNames(styles.content, "mt-3", "overflow-hidden")}
            >
              <section className="panel mb-3">
                <div className="row row32 justify-content-between align-items-center">
                  <div className="row justify-content-end align-items-center ml-3">
                    <Button
                      type="primary"
                      size="medium"
                      onClick={fnUploadReport}
                    >
                      Загрузить отчет
                    </Button>
                  </div>
                  <div className="row justify-content-end align-items-center mr-2">
                    <div className="col-auto">
                      <Select
                        className={classNames(styles.sort, "demo-select")}
                        name="label-left-select"
                        label="Сортировать по"
                        labelPosition="left"
                        placeholder="Выберите значение"
                        options={options}
                        size="small"
                        onChange={fnSort}
                        value={ftsReportsStore.sortValue}
                      />
                    </div>
                    <div className="col-auto">
                      <Checkbox
                        className={styles.isRelevant}
                        label="Показать только актуальные"
                        checked={ftsReportsStore.isOnlyRelevant}
                        onChange={toggleRelevant}
                      />
                    </div>
                    <div className="col-auto">
                      <UnderTableSummary
                        overallCount={ftsReportsStore.overallCount}
                        rowsPerPage={ftsReportsStore.rowsPerPage}
                        setRowsPerPage={ftsReportsStore.setRowsPerPage}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <FtsReportCardList
                rows={ftsReportsStore.paginatedFtsReportList || []}
                setModalVisible={setModalVisible}
                setModalMode={setModalMode}
                setSelectedReport={setSelectedReport}
              />

              <section className="panel mt-3">
                <div className="row row32 justify-content-between align-items-center">
                  <div className="col-auto">
                    <Pagination
                      itemCount={ftsReportsStore.overallCount}
                      itemsPerPage={ftsReportsStore.rowsPerPage}
                      activePage={ftsReportsStore.pageNum}
                      onChangeActivePage={(value) =>
                        ftsReportsStore.setPageNum(value)
                      }
                    />
                  </div>
                  <div className="col-auto">
                    <UnderTableSummary
                      overallCount={ftsReportsStore.overallCount}
                      rowsPerPage={ftsReportsStore.rowsPerPage}
                      setRowsPerPage={ftsReportsStore.setRowsPerPage}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <FtsReportModal
        visible={modalVisible}
        setVisible={setModalVisible}
        mode={modalMode}
        selectedReport={selectedReport}
      />
    </>
  );
});

FtsReports.displayName = "FtsReports";

export default FtsReports;

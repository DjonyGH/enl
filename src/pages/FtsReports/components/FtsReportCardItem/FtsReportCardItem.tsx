import React, { useState } from "react";
import cn from "classnames";
import { Button, Spinner } from "@ff/ui-kit";

import styles from "./FtsReportCardItem.module.scss";
import {
  EFtsReportStatus,
  EModalMode,
  IFtsReport,
} from "pages/FtsReports/types";
import ftsReportsStore from "pages/FtsReports/store/ftsReports.store";
import { tools } from "utils/tools";

type IProps = {
  row: IFtsReport;
  setModalVisible: (value: boolean) => void;
  setModalMode: (value: EModalMode) => void;
  setSelectedReport: (value: IFtsReport) => void;
};

const FtsReportCardItem: React.FC<IProps> = ({
  row,
  setModalVisible,
  setModalMode,
  setSelectedReport,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fnApprove = async () => {
    setIsLoading(true);
    await ftsReportsStore.approveFtsReport(row);
    setIsLoading(false);
  };

  const fnReload = () => {
    setSelectedReport(row);
    setModalMode(EModalMode.reloading);
    setModalVisible(true);
  };

  const approveBtnJSX = isLoading ? (
    <Spinner>
      <Button type="primary" size="small" onClick={fnApprove}>
        Утвердить
      </Button>
    </Spinner>
  ) : (
    <Button type="primary" size="small" onClick={fnApprove}>
      Утвердить
    </Button>
  );

  return (
    <section className={styles.uploadedReportCard}>
      <div className={styles.left}>
        <div className={cn(styles.item, styles.with_dot)}>
          Отчетный год: <span className={styles.value}>{row.reportYear}</span>
        </div>

        <div className={cn(styles.item, styles.with_dot)}>
          Дата и время загрузки:{" "}
          <span className={styles.value}>
            {row.uploadedAt
              ? tools.dateToString2(new Date(row.uploadedAt))
              : "..."}
          </span>
        </div>

        <div className={styles.item}>
          Загрузил: <span className={styles.value}>{row.uploadedBy}</span>
        </div>
      </div>

      <div className={styles.right}>
        {row.statusId === EFtsReportStatus.noRelevant ? (
          <div className={styles.noRelevant}>Не актуален</div>
        ) : (
          <div className={styles.controls}>
            {row.statusId !== EFtsReportStatus.approved ? (
              approveBtnJSX
            ) : (
              <div className={styles.approved}>Утверждено</div>
            )}
            <Button type="basic" size="small" onClick={fnReload}>
              Перезагрузить
            </Button>
          </div>
        )}
        <a href={row.fileUrl} className="mx-3" target="_blank" rel="noreferrer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 20C2 19.4477 2.3198 19 2.71429 19L21.2857 19C21.6802 19 22 19.4477 22 20C22 20.5523 21.6802 21 21.2857 21L2.71429 21C2.3198 21 2 20.5523 2 20Z"
              fill="#0057FF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.0246 15.4996C13.0246 16.0519 12.5768 16.4996 12.0246 16.4996C11.4723 16.4996 11.0246 16.0519 11.0246 15.4996L11.0246 6.65297L8.45518 9.20842C8.0636 9.59788 7.43043 9.59615 7.04097 9.20457C6.65151 8.81298 6.65323 8.17982 7.04482 7.79036L11.3174 3.54101C11.7089 3.15158 12.342 3.15326 12.7315 3.54475L16.9589 7.79411C17.3484 8.18564 17.3468 8.8188 16.9553 9.20832C16.5637 9.59783 15.9306 9.5962 15.5411 9.20467L13.0246 6.67513L13.0246 15.4996Z"
              fill="#0057FF"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};
export default FtsReportCardItem;

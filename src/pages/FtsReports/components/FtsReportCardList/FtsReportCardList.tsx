import React from "react";
import _ from "lodash";

import FtsReportCardItem from "../FtsReportCardItem";
import { EModalMode, IFtsReport } from "pages/FtsReports/types";

type IProps = {
  rows: IFtsReport[];
  setModalVisible: (value: boolean) => void;
  setModalMode: (value: EModalMode) => void;
  setSelectedReport: (value: IFtsReport) => void;
};

const FtsReportCardList: React.FC<IProps> = ({
  rows,
  setModalVisible,
  setModalMode,
  setSelectedReport,
}) => (
  <div className="scrollbar-block scrollbar-block_vert h-100">
    {rows.map((row, index) => (
      <FtsReportCardItem
        row={row}
        key={index + 1}
        setModalVisible={setModalVisible}
        setModalMode={setModalMode}
        setSelectedReport={setSelectedReport}
      />
    ))}
  </div>
);

export default FtsReportCardList;

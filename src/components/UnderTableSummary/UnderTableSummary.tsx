import React from "react";
import cn from "classnames";
import _ from "lodash";

interface IProps {
  overallCount: number;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
}

const UnderTableSummary: React.FC<IProps> = (props) => {
  const { overallCount, rowsPerPage, setRowsPerPage } = props;
  const cnComponent = cn("table-control");
  const ar = [10, 20, 30, 50, 100];
  const block = _.map(ar, (el) => (
    <option value={el} key={el}>
      {el}
    </option>
  ));

  return (
    <div className={cnComponent}>
      Показывать по
      <select
        className="form-control form-control_small ml-3 mr-3"
        onChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
        }}
        value={rowsPerPage}
      >
        {block}
      </select>
      Всего записей: {overallCount}
    </div>
  );
};

export default UnderTableSummary;

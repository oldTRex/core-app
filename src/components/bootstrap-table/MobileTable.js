import React, { Fragment } from "react";
import classnames from "classnames";
import LaddaButton from "components/laddaButton/LaddaButton";
import { ClipLoader } from "react-spinners";

const MobileTable = ({
  data,
  columns,
  rowEvents,
  hover,
  nextPage,
  previousPage,
  loading,
  toggle,
  columnFilter,
  ...props
}) => {
  console.log("data", data);
  console.log("columns", columns);
  return (
    <Fragment>
      {columnFilter && (
        <LaddaButton onClick={toggle} color="primary">
          <i className="fa fa-filter fa-2x" />
        </LaddaButton>
      )}

      {loading ? (
        <div className="w-100 my-5 text-center">
          <ClipLoader size={80} color={"#ddd"} loading={true} />
        </div>
      ) : (
        <div className="d-flex flex-column">
          {data &&
            data.map((d, i) => (
              <div
                className={classnames("border-bottom py-4", {
                  "cursor-pointer": Boolean(rowEvents && rowEvents.onClick)
                })}
                onClick={e =>
                  rowEvents && rowEvents.onClick && rowEvents.onClick(e, d)
                }
                key={"row" + i}
              >
                {columns &&
                  columns.map((column, index) => (
                    <div
                      className="d-flex justify-content-between mt-2"
                      key={"td" + i + index}
                    >
                      <div className="th">
                        {column.headerFormatter
                          ? column.headerFormatter()
                          : column.text}
                      </div>
                      <div>
                        {column.formatter
                          ? column.formatter(column, d)
                          : d[column.dataField]}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      )}

      <div className="my-3 d-flex justify-content-between">
        <LaddaButton square color="primary" onClick={nextPage}>
          صفحه بعدی
        </LaddaButton>
        <LaddaButton square color="success" onClick={previousPage}>
          صفحه قبل
        </LaddaButton>
      </div>
    </Fragment>
  );
};

export default MobileTable;

import React from "react";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import TableList from "./TableList";

const Table = () => {
  return (<>
            <div className="flex flex-col items-center">
              <TableHeader />
              <TableContent />
            </div>
              <TableList />
      </>
  );
};

export default Table;

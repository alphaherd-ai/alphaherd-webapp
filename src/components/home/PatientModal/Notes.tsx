import React from "react";

const Notes = () => {
  return (
    <div className="w-full bg-white flex flex-col gap-4 px-6 py-4">
      <div>
        <span className="text-gray-500 text-base font-bold">Notes</span>
      </div>
      <div>
        <textarea className="outline-none border-0 text-gray-400 text-base hover:bg-gray-100 px-2 transition-all rounded-sm" cols={75} rows={8} />
      </div>

    </div>
  );
};

export default Notes;



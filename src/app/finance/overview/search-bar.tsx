import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type SearchBarType = {
  searchForClientViaClientD?: string;
  search?: string;

  /** Style props */
  searchBarFlexShrink?: CSSProperties["flexShrink"];
};

const SearchBar: NextPage<SearchBarType> = ({
  searchForClientViaClientD,
  search,
  searchBarFlexShrink,
}) => {
  const searchBarStyle: CSSProperties = useMemo(() => {
    return {
      flexShrink: searchBarFlexShrink,
    };
  }, [searchBarFlexShrink]);

  return (
    <div
      className="rounded-8xs bg-structure-general box-border w-[345px] h-[45px] overflow-hidden flex flex-row items-center justify-start py-[13px] px-4 gap-[14px] text-left text-[15.46px] text-item-grey-icon-text-stroke05 font-selected-14 border-[0.5px] border-solid border-item-grey-icon-text-stroke05"
      style={searchBarStyle}
    >
      <div className="flex-1 relative font-medium">
        {searchForClientViaClientD}
      </div>
      <img className="relative w-[23.19px] h-[23.19px]" alt="" src={search} />
    </div>
  );
};

export default SearchBar;

import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export interface IHomeProps {}

export default function Home(props: IHomeProps) {

    // states for sort and category
    const [handleOpenSort, setHandleOpenSort] = React.useState(false)
    const [handleOpenCategory, setHandleOpenCategory] = React.useState(false)


  return (
    <div className="w-full h-auto flex p-10 justify-center items-center">

      {/* Content */}
      <div className="main-content  w-[80%] min-h-[600px] flex  bg-gray-100">
        {/* Search Inputs & Sorting/Filtering */}
        <div className="w-full flex flex-col h-auto">

          <div className="searchBox w-full flex items-center  border border-gray-300 rounded-3xl bg-white ">
            <SearchIcon className="mx-2"/>
            <input type="text" placeholder="Search..." className=" outline-none w-full h-[50px] bg-inherit" />
            <ArrowForwardIcon className="mx-2" />
          </div>

          {/* Sort & Category */}
          <div className="sort-category w-full flex justify-between items-center mt-6">

            <div className="sortBtn cursor-pointer flex items-center justify-between bg-white rounded-xl p-2 w-full mr-4 " onClick={()=>setHandleOpenSort(item => !item)}>
                <h1 className="text-[15px]">Sort</h1>
                {
                    handleOpenSort ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
            </div>

            <div className="categoryBtn cursor-pointer flex items-center justify-between bg-white rounded-xl p-2 w-full ml-4" onClick={()=>setHandleOpenCategory(item => !item)}>
                <h1 className="text-[15px]">Category</h1>
                {
                    handleOpenCategory ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
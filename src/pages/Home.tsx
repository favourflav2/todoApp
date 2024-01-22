import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { UseSelector } from "../redux/store";
import TodoCard from "../components/todoCard/TodoCard";



export interface IHomeProps {}

export default function Home(props: IHomeProps) {

    // Redux States
    const {todos} = UseSelector(state => state.todo)

    // naviagte
    const navigate = useNavigate()

    // states for sort and category
    const [handleOpenSort, setHandleOpenSort] = React.useState(false)
    const [handleOpenCategory, setHandleOpenCategory] = React.useState(false)

    


  return (
    <div className="w-full min-h-screen flex p-10 justify-center items-center bg-gray-200">

      {/* Content */}
      <div className="main-content  w-[80%] min-h-[600px] flex flex-col items-center   ">

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

        {/* Mapped Data */}
        <div className="w-full h-auto flex flex-col">
            {
                todos?.map((item:any,index:number)=>(
                    <TodoCard item={item} key={index} id={index}/>
                ))
            }
        </div>

        {/* Add Task */}
        <div className="addTaskBtn cursor-pointer px-3 py-4 text-white bg-blue-400 flex items-center justify-around w-[150px] my-5 rounded-3xl" onClick={()=>navigate("/addTask")}>
                <AddIcon />
                <h1>Add Task</h1>
        </div>


      </div>

    </div>
  );
}

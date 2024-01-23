import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { Dispatch, UseSelector } from "../redux/store";
import TodoCard from "../components/todoCard/TodoCard";
import PowerIcon from "@mui/icons-material/Power";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import { FormControl, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { setFilteredTags } from "../redux/features/todoSlice";
dayjs.extend(advancedFormat);

export interface IHomeProps {}

interface Todo {
  title: string;
  date: string;
  time: string;
  priority: number;
  complexity: number;
  percentage: any;
  checkList: Array<any>;
  tagList: Array<number | string>;
  fullDate: string;
  isDone: boolean;
}

interface Sort {
  state: string;
  arrayTodos: Array<Todo>;
}

export default function Home(props: IHomeProps) {
  // Redux States
  const { todos, filterTags } = UseSelector((state) => state.todo);
  let copyTodo = todos.slice();
  const dispatch = Dispatch();

  // naviagte
  const navigate = useNavigate();

  // states for sort and category
  const [handleOpenSort, setHandleOpenSort] = React.useState(false);
  const [handleOpenCategory, setHandleOpenCategory] = React.useState(false);

  // power state
  const [powerOnAndOff, setPowerOnAndOff] = React.useState(false);

  // Filter and Sort States
  const sortList = ["Ascending Date", "Descending Date", "Ascending Complexity", "Descending Complexity", "Ascending Priority", "Descending Priority"];
  const [sortState, setSortState] = React.useState("");
  const [filterState, setFilterState] = React.useState("");

  // Helper Functions
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortState((event.target as HTMLInputElement).value);
  };
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState((event.target as HTMLInputElement).value);
  };

  function sortSwitchCase({ arrayTodos, state }: Sort) {
    switch (state) {
      case "Ascending Complexity":
        return arrayTodos.sort((a, b): any => {
          return a.complexity - b.complexity;
        });
      case "Descending Complexity":
        return arrayTodos.sort((a, b): any => {
          return b.complexity - a.complexity;
        });
      case "Ascending Priority":
        return arrayTodos.sort((a, b): any => {
          return a.priority - b.priority;
        });
      case "Descending Priority":
        return arrayTodos.sort((a, b): any => {
          return b.priority - a.priority;
        });
      case "Descending Date":
        return arrayTodos.sort((a, b): any => {
          return Number(dayjs(b.fullDate).format("X")) - Number(dayjs(a.fullDate).format("X"));
        });
      case "Ascending Date":
        return arrayTodos.sort((a, b): any => {
          return Number(dayjs(a.fullDate).format("X")) - Number(dayjs(b.fullDate).format("X"));
        });
      default:
        return arrayTodos;
    }
  }

 function filterAndReturn(array:Array<any>,value:string){
    // Struggled with this 
    //* I decided to loop over my array ... then loop over the tag list array ... all in the same filter function
    // This allowed me to me to compare my filterState to every tag list in every todo in my array 
    //* If there was a match we returned true ... meaning we found todos with the mathcing tag 
    let res = array.filter(item => {
        for(let data of item.tagList){
          if(data.toLowerCase() === value.toLowerCase()){
            return true
          }
        }
        return false
      })
      return res
 }

  function handleFilterAndSort(array: Array<any>, sortStateKey: string, filterStateKey: string) {

    // If theres no filterState or sortState we simply return our array untouched
    if(!sortStateKey?.length && !filterStateKey?.length){
        return array
    }

    // There is a filterState and sortState we first set a variable that contains our filtered array
    //* Then we send our filtered array to our sort switch case that handles our sorting 
    // Then we return
    if(sortStateKey && filterStateKey){
        let data = filterAndReturn(array,filterState)
        return sortSwitchCase({arrayTodos:data,state:sortStateKey})
    }

    // If we only have a filterState we just return an array of the filterd data
    if(filterStateKey){
        return filterAndReturn(array,filterStateKey)
    }
    
   // If we only have a sortState we just return an aray of our sorted data
    if(sortStateKey?.length){
      return  sortSwitchCase({arrayTodos:array,state:sortStateKey})
    }
  }

  
  // This react useEffect dynamically updates my filter state array ... if the power switch is on we send the filtered array to my redux ... if its not on we send over our full list
  React.useEffect(() => {
    if(powerOnAndOff){
        dispatch(setFilteredTags(copyTodo.filter((val) => val.isDone !== false)));
    }else{
        dispatch(setFilteredTags(copyTodo));
    }
  }, [todos,powerOnAndOff]);// eslint-disable-line


  return (
    <div className="w-full min-h-screen flex p-10 justify-center items-center bg-gray-200">
      {/* Content */}
      <div className="main-content  w-[80%] min-h-[600px] flex flex-col items-center   ">
        {/* Search Inputs & Sorting/Filtering */}
        <div className="w-full flex flex-col h-auto">
          <div className="searchBox w-full flex items-center  border border-gray-300 rounded-3xl bg-white ">
            <SearchIcon className="mx-2" />
            <input type="text" placeholder="Search..." className=" outline-none w-full h-[50px] bg-inherit" />
            <ArrowForwardIcon className="mx-2" />
          </div>

          {/* Sort & Category */}
          <div className="sort-category w-full flex justify-between items-center mt-6 ">
            <div className="sortBtn cursor-pointer flex items-center justify-between bg-white rounded-xl h-[40px] w-full mr-4 relative" onClick={() => setHandleOpenSort((item) => !item)}>
              <h1 className="text-[15px] ml-2">{sortState?.length ? `Sort: ${sortState}` : `Sort`}</h1>
              {handleOpenSort ? <KeyboardArrowUpIcon className=" mr-2" /> : <KeyboardArrowDownIcon className=" mr-2" />}

              {handleOpenSort && (
                <div className=" absolute  top-[45px] w-full rounded-2xl p-4 border border-gray-400 bg-white boxShadow z-10">
                  <FormControl>
                    <RadioGroup
                      name="controlled-radio-buttons-group"
                      value={sortState}
                      onChange={(e) => {
                        setHandleOpenSort((item) => !item);
                        handleChange(e);
                      }}
                    >
                      {sortList.map((item: string, index: number) => (
                        <FormControlLabel
                          value={item}
                          control={<Radio />}
                          label={item}
                          key={index}
                          onClick={() => {
                            setHandleOpenSort((item) => !item);
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              )}
            </div>

            <div className="categoryBtn cursor-pointer flex items-center justify-between bg-white rounded-xl h-[40px] w-full ml-4 relative" onClick={() => setHandleOpenCategory((item) => !item)}>
              <h1 className="text-[15px] ml-2">{filterState?.length ? `Category: ${filterState}` : `Category`}</h1>
              {handleOpenCategory ? <KeyboardArrowUpIcon className=" mr-2" /> : <KeyboardArrowDownIcon className=" mr-2" />}
              {handleOpenCategory && (
                <div className=" absolute  top-[45px] w-full rounded-2xl p-4 border border-gray-400 bg-white boxShadow z-10">
                  <FormControl>
                    <RadioGroup
                      name="controlled-radio-buttons-group"
                      value={filterState}
                      onChange={(e) => {
                        setHandleOpenCategory((item) => !item);
                        handleFilterChange(e);
                      }}
                    >
                      {filterTags?.map((item: any, index: number) => (
                        <FormControlLabel
                          value={item}
                          control={<Radio />}
                          label={item}
                          key={index}
                          onClick={() => {
                            setHandleOpenCategory((item) => !item);
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          {/* Clear Button */}
          {sortState.length ? (
            <button
              className="my-8 bg-blue-400 rounded-full w-[140px] mx-2 py-4 text-white"
              onClick={() => {
                setSortState("");
              }}
            >
              Clear Sort
            </button>
          ) : (
            <></>
          )}

          {/* Power Button */}
          {powerOnAndOff ? (
            <button className="my-8 bg-blue-400 rounded-full w-[140px] mx-2 py-4 text-white" onClick={() => setPowerOnAndOff((item) => !item)}>
              <PowerIcon /> Power On
            </button>
          ) : (
            <button className="my-8 bg-gray-400 rounded-full w-[140px] mx-2 py-4 text-white" onClick={() => setPowerOnAndOff((item) => !item)}>
              <PowerOffIcon /> Power Off
            </button>
          )}

          {/* Clear Button */}
          {filterState?.length ? (
            <button
              className="my-8 bg-blue-400 rounded-full w-[140px] mx-2 py-4 text-white"
              onClick={() => {
                setFilterState("");
              }}
            >
              {" "}
              Clear Category
            </button>
          ) : (
            <></>
          )}
        </div>

        {/* Mapped Data */}
        <div className="w-full h-auto flex flex-col">
          {powerOnAndOff
            ? handleFilterAndSort(copyTodo,sortState,filterState)?.filter((val) => val.isDone !== false).map((item: any, index: number) => <TodoCard item={item} key={index} id={index} />)
            : handleFilterAndSort(copyTodo,sortState,filterState)?.map((item: any, index: number) => <TodoCard item={item} key={index} id={index} />)}
        </div>

        {/* Add Task */}
        <div className="addTaskBtn cursor-pointer px-3 py-4 text-white bg-blue-400 flex items-center justify-around w-[150px] my-5 rounded-3xl" onClick={() => navigate("/addTask")}>
          <AddIcon />
          <h1>Add Task</h1>
        </div>
      </div>
    </div>
  );
}

// {powerOnAndOff
//     ? todos?.filter((val) => val.isDone !== false).map((item: any, index: number) => <TodoCard item={item} key={index} id={index} />)
//     : todos?.map((item: any, index: number) => <TodoCard item={item} key={index} id={index} />)}

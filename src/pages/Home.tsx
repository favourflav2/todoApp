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
import { motion } from "framer-motion";
dayjs.extend(advancedFormat);

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

export default function Home() {
  // Redux States
  const { todos, filterTags } = UseSelector((state) => state.todo);
  let copyTodo = todos.slice();
  const dispatch = Dispatch();

  // naviagte
  const navigate = useNavigate();

  // Search State
  const [searchState, setSearchState] = React.useState("");

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

  const [popLayout, setPopLayout] = React.useState(false);

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

  function filterAndReturn(array: Array<any>, value: string) {
    // Struggled with this
    //* I decided to loop over my array ... then loop over the tag list array ... all in the same filter function
    // This allowed me to me to compare my filterState to every tag list in every todo in my array
    //* If there was a match we returned true ... meaning we found todos with the mathcing tag
    let res = array.filter((item) => {
      for (let data of item.tagList) {
        if (data.toLowerCase() === value.toLowerCase()) {
          return true;
        }
      }
      return false;
    });
    return res;
  }

  function handleSearch(array: Array<any>, searchVal: string) {
    if (searchVal) {
      return array.filter((item) => item.title.toLowerCase().includes(searchVal.toLowerCase()));
    }
  }

  function handleFilterAndSort(array: Array<any>, sortStateKey: string, filterStateKey: string, search: string) {
    // If theres no filterState, sortState, or search state we simply return our array untouched
    if (!sortStateKey?.length && !filterStateKey?.length && !search) {
      return array;
    }

    if (search && sortStateKey && filterStateKey) {
      let searchedData = handleSearch(array, search);

      // If our search filter has length
      if (searchedData?.length) {
        let filter = filterAndReturn(searchedData, filterState);
        return sortSwitchCase({ arrayTodos: filter, state: sortStateKey });
      }
    }

    if (search && sortStateKey) {
      let data = handleSearch(array, search);

      if (data?.length) {
        return sortSwitchCase({ arrayTodos: data, state: sortStateKey });
      }
    }

    if (search && filterStateKey) {
      let data = handleSearch(array, search);

      if (data?.length) {
        return filterAndReturn(data, filterState);
      }
    }

    if (search) {
      return handleSearch(array, search);
    }

    // There is a filterState and sortState we first set a variable that contains our filtered array
    //* Then we send our filtered array to our sort switch case that handles our sorting
    // Then we return
    if (sortStateKey && filterStateKey) {
      let data = filterAndReturn(array, filterState);
      return sortSwitchCase({ arrayTodos: data, state: sortStateKey });
    }

    // If we only have a filterState we just return an array of the filterd data
    if (filterStateKey) {
      return filterAndReturn(array, filterStateKey);
    }

    // If we only have a sortState we just return an aray of our sorted data
    if (sortStateKey?.length) {
      return sortSwitchCase({ arrayTodos: array, state: sortStateKey });
    }
  }

  // This react useEffect dynamically updates my filter state array ... if the power switch is on we send the filtered array to my redux ... if its not on we send over our full list
  React.useEffect(() => {
    if (powerOnAndOff) {
      dispatch(setFilteredTags(copyTodo.filter((val) => val.isDone !== false)));
    } else {
      dispatch(setFilteredTags(copyTodo));
    }
  }, [todos, powerOnAndOff]); // eslint-disable-line

  return (
    <div className="w-full min-h-screen flex p-10 justify-center items-center bg-gray-200">
      {/* Content */}
      <div className="main-content  w-full md:w-[80%] xl:w-[50%] min-h-[600px] flex flex-col items-center   ">
        {/* Search Inputs & Sorting/Filtering */}
        <div className="w-full flex flex-col h-auto">
          <div className="searchBox w-full flex items-center  border border-gray-300 rounded-3xl bg-white ">
            <SearchIcon className="mx-2" />
            <input
              type="text"
              placeholder="Search..."
              className=" outline-none w-full h-[50px] bg-inherit"
              onChange={(e) => {
                setSearchState(e.target.value);
                setPopLayout((item) => !item);
              }}
              value={searchState}
            />
            <ArrowForwardIcon className="mx-2" />
          </div>

          {/* Sort & Category */}
          <div className="sort-category w-full flex flex-col sm:flex-row justify-between items-center mt-6 mb-2 sm:mb-0">
            <div
              className="sortBtn cursor-pointer flex items-center justify-between bg-white rounded-xl h-[40px] w-full sm:mr-4 mb-5 sm:mb-0 relative"
              onClick={() => setHandleOpenSort((item) => !item)}
            >
              <h1 className="text-[15px] ml-2">{sortState?.length ? `Sort: ${sortState}` : `Sort`}</h1>
              {handleOpenSort ? <KeyboardArrowUpIcon className=" mr-2" /> : <KeyboardArrowDownIcon className=" mr-2" />}

              {handleOpenSort && (
                <motion.div
                  className=" absolute  top-[45px] w-full rounded-2xl p-4 border border-gray-400 bg-white boxShadow z-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
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
                </motion.div>
              )}
            </div>

            <div className="categoryBtn cursor-pointer flex items-center justify-between bg-white rounded-xl h-[40px] w-full sm:ml-4 relative" onClick={() => setHandleOpenCategory((item) => !item)}>
              <h1 className="text-[15px] ml-2">{filterState?.length ? `Category: ${filterState}` : `Category`}</h1>
              {handleOpenCategory ? <KeyboardArrowUpIcon className=" mr-2" /> : <KeyboardArrowDownIcon className=" mr-2" />}
              {handleOpenCategory && (
                <motion.div
                  className=" absolute  top-[45px] w-full rounded-2xl p-4 border border-gray-400 bg-white boxShadow z-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
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
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center justify-center">
          {/* Clear Button */}
          {sortState.length ? (
            <button
              className="sm:my-8 my-2 bg-blue-400 rounded-full w-[140px] mx-2 py-4 text-white"
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
            <button className="sm:my-8 my-2 bg-blue-400 rounded-full w-[140px] mx-2 py-4 text-white" onClick={() => setPowerOnAndOff((item) => !item)}>
              <PowerIcon /> Power On
            </button>
          ) : (
            <button className="sm:my-8 my-2 bg-gray-400 rounded-full w-[140px] mx-2 py-4 text-white" onClick={() => setPowerOnAndOff((item) => !item)}>
              <PowerOffIcon /> Power Off
            </button>
          )}

          {/* Clear Button */}
          {filterState?.length ? (
            <button
              className="sm:my-8 my-2 bg-blue-400 rounded-full w-[140px] mx-2 py-4 text-white"
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
        {
            todos?.length ? 
            (
<div className="w-full h-auto flex flex-col">
          {powerOnAndOff ? (
            handleFilterAndSort(copyTodo, sortState, filterState, searchState)?.filter((val) => val.isDone !== false)?.length ? (
              handleFilterAndSort(copyTodo, sortState, filterState, searchState)
                ?.filter((val) => val.isDone !== false)
                ?.map((item: any, index: any) => <TodoCard item={item} key={index} id={index} popLayout={popLayout} />)
            ) : (
              <motion.div
                className="w-full flex flex-col justify-center items-center my-10"
                initial={{ x: 300, opacity: 0, scale: 0.2 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", type: "spring" }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                {filterState ? (
                  <h1 className="text-[20px] font-bold">
                    There are no Todos with the value of "{searchState}" and Category of "{filterState}"
                  </h1>
                ) : (
                  <h1 className="text-[20px] font-bold">There are no Todos with the value of "{searchState}"</h1>
                )}
              </motion.div>
            )
          ) : handleFilterAndSort(copyTodo, sortState, filterState, searchState)?.length ? (
            handleFilterAndSort(copyTodo, sortState, filterState, searchState)?.map((item: any, index: any) => <TodoCard item={item} key={index} id={index} popLayout={popLayout} />)
          ) : (
            <motion.div
              className="w-full flex flex-col justify-center items-center my-10"
              initial={{ x: 300, opacity: 0, scale: 0.2 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", type: "spring" }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {filterState ? (
                <h1 className="text-[20px] font-bold">
                  There are no Todos with the value of "{searchState}" and Category of "{filterState}"
                </h1>
              ) : (
                <h1 className="text-[20px] font-bold">There are no Todos with the value of "{searchState}"</h1>
              )}
            </motion.div>
          )}
        </div>
            ) 
            : 
            (
                <motion.div
              className="w-full flex flex-col justify-center items-center my-10"
              initial={{ x: 300, opacity: 0, scale: 0.2 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", type: "spring" }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h1 className="font-bold text-[18px]">You currenlty dont't have any todos</h1>
            </motion.div>
            )
        }

        {/* Add Task */}
        <div className="addTaskBtn cursor-pointer px-3 py-4 text-white bg-blue-400 flex items-center justify-around w-[150px] my-5 rounded-3xl" onClick={() => navigate("/addTask")}>
          <AddIcon />
          <h1>Add Task</h1>
        </div>
      </div>
    </div>
  );
}

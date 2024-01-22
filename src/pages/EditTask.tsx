import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AddIcon from "@mui/icons-material/Add";
import CheckListCard from "../components/checkListCard/CheckListCard";
import { Dispatch, UseSelector } from "../redux/store";
import {  editTodo } from "../redux/features/todoSlice";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import TagListCard from "../components/checkListCard/TagListCard";

export interface IEditTaskProps {}

interface Todo {
  title: string;
  date: Dayjs | string;
  time: Dayjs | string;
  priority: number;
  complexity: number;
  percentage: any;
  checkList: Array<any>;
  tagList: Array<any>;
  fullDate: string
}

export default function EditTask(props: IEditTaskProps) {
  let oneThorughTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  

  // Redux State
  const { todos } = UseSelector((state) => state.todo);
  const dispatch = Dispatch();
  const { id } = useParams();
  const data = todos.find((item, index) => Number(index) === Number(id));
  const navigate = useNavigate();



  // state for typing
  const [textState, setTextState] = React.useState({
    taskName: data ? data.title : "",
    checkList: "",
    addTags: "",
  });

  // Priortiy and Complexity State
  const [priorityState, setPriority] = React.useState<number | string>(data ? data?.priority : "");
  const [complexityState, setComplexity] = React.useState<number | string>(data ? data?.complexity : "");

  // error state
  const [errors, setErrors] = React.useState({
    taskName: false,
    checkList: false,
    addTags: false,
    date: false,
    time: false,
    priority: false,
    complexity: false,
  });

  // date and time state
  const [dateData, setDateData] = React.useState<Dayjs | null>(data ? dayjs(data?.date) : null);
  const [timeData, setTimeData] = React.useState<Dayjs | null>(data ? dayjs(data?.fullDate) : null);

  // add checklist state
  const [addCheckList, setAddCheckList] = React.useState<Array<any>>(data ? data?.checkList : []);
  const [addTagsList, setAddTagsList] = React.useState<Array<string | number>>(data ? data?.tagList : []);

  // helper functions

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTextState((item) => {
      return {
        ...item,
        [e.target.name]: e.target.value,
      };
    });
  }

  function deleteCheckListItem(id: number) {
    let newArr = addCheckList.slice();
    let res = newArr.filter((item, i) => i !== id);

    setAddCheckList(res);
  }

  function addToList() {
    if (!textState.checkList.length) {
      setErrors((item) => {
        return {
          ...item,
          checkList: true,
        };
      });
    } else {
      setAddCheckList((item) => [...item, { checkList: textState.checkList, completed: false }]);
      setTextState((item) => {
        return {
          ...item,
          checkList: "",
        };
      });
    }
  }

  function addToTagsFunc() {
    if (!textState.addTags.length) {
      setErrors((item) => {
        return {
          ...item,
          addTags: true,
        };
      });
    } else {
      setAddTagsList((item) => [...item, textState.addTags]);
      setTextState((item) => {
        return {
          ...item,
          addTags: "",
        };
      });
    }
  }

  function deleteTagsListItem(id: number) {
    let newArr = addTagsList.slice();
    let res = newArr.filter((item, i) => i !== id);

    setAddTagsList(res);
  }

  function editArrayTodo() {
    if (textState.taskName && timeData && dateData && priorityState && complexityState) {
      dispatch(editTodo({ data: todoObj, id }));
      navigate("/");
    }

    if (!textState.taskName.length) {
      setErrors((item) => {
        return {
          ...item,
          taskName: true,
        };
      });
    }
    if (!timeData) {
      setErrors((item) => {
        return {
          ...item,
          time: true,
        };
      });
    }
    if (!dateData) {
      setErrors((item) => {
        return {
          ...item,
          date: true,
        };
      });
    }
    if (!priorityState) {
      setErrors((item) => {
        return {
          ...item,
          priority: true,
        };
      });
    }
    if (!complexityState) {
      setErrors((item) => {
        return {
          ...item,
          complexity: true,
        };
      });
    }
  }

  let newDate = dayjs(dateData).format('MM/DD/YYYY')
  let newTime = dayjs(timeData).format('hh:mm a')

  // Obj Todo Pushed into Array
  const todoObj: Todo = {
    title: textState.taskName,
    date: dateData ? dayjs(dateData).format("MM/DD/YYYY") : "",
    time: timeData ? dayjs(timeData).format("h:mm a") : "",
    priority: Number(priorityState),
    complexity: Number(complexityState),
    percentage: 0,
    checkList: addCheckList,
    tagList: addTagsList,
    fullDate: dateData && timeData ? dayjs(`${newDate} ${newTime}`).format() : ""
  };

  // React useEffects

  React.useEffect(() => {
    if (errors.checkList === true) {
      if (textState.checkList.length) {
        setErrors((item) => {
          return {
            ...item,
            checkList: false,
          };
        });
      }
    }

    if (errors.addTags === true) {
      if (textState.addTags.length) {
        setErrors((item) => {
          return {
            ...item,
            addTags: false,
          };
        });
      }
    }

    if (errors.taskName === true) {
      if (textState.taskName.length) {
        setErrors((item) => {
          return {
            ...item,
            taskName: false,
          };
        });
      }
    }

    if (errors.priority === true) {
      if (priorityState) {
        setErrors((item) => {
          return {
            ...item,
            priority: false,
          };
        });
      }
    }

    if (errors.complexity === true) {
      if (complexityState) {
        setErrors((item) => {
          return {
            ...item,
            complexity: false,
          };
        });
      }
    }

    if (errors.date === true) {
      if (dateData) {
        setErrors((item) => {
          return {
            ...item,
            date: false,
          };
        });
      }
    }

    if (errors.time === true) {
      if (timeData) {
        setErrors((item) => {
          return {
            ...item,
            time: false,
          };
        });
      }
    }
  }, [errors, textState, priorityState, complexityState, dateData, timeData]);
  return (
    <div className="w-full flex h-auto p-10 justify-center  bg-gray-200">
      {/* Content */}
      <div className="main-content w-[80%] lg:w-[50%] md:w-[60%] xl:w-[40%] 2xl:w-[30%] h-auto flex flex-col ">
        {/* Title */}
        <div className="flex justify-center items-center relative w-full">
          <h1 className="title text-[28px] font-medium">Edit Task</h1>

          <ArrowBackIcon className=" absolute left-0 text-[30px]" onClick={()=>navigate(-1)}/>
        </div>

        {/* Name */}
        <div className="w-full h-auto flex flex-col mt-10">
          <h1 className="font-medium text-[17px]">Task Name</h1>
          <input
            type="text"
            name="taskName"
            value={textState.taskName}
            className={`outline-none border ${errors.taskName ? "border-red-500" : "border-gray-300"} rounded-3xl h-[50px] mt-2 indent-3`}
            onChange={(e) => handleChange(e)}
          />
          {errors.taskName && <p className="ml-2 text-[11px] text-red-500">Please Add A Name</p>}
        </div>

        {/* Priority Level */}
        <div className="w-full flex flex-col mt-8">
          <h1 className={`font-medium text-[17px] ${errors.priority ? "text-red-500" : ""}`}>Select Priority Level</h1>

          {/* Mapped Data */}
          <div className="flex items-center justify-between w-full h-auto mt-2">
            {oneThorughTen?.map((item: number, index: number) => (
              <div
                key={index}
                className={` ${priorityState === index + 1 ? "bg-blue-500 text-white" : "bg-blue-300"} cursor-pointer bg-blue-200 flex justify-center items-center rounded-full w-[35px] h-[35px]`}
                onClick={() => {
                  if (index + 1 === item) {
                    setPriority(item);
                  }
                }}
              >
                {item}
              </div>
            ))}
          </div>
          {errors.priority && <p className="ml-2 text-[11px] mt-1 text-red-500">Please Select A Number</p>}
        </div>

        {/* Complexity Level */}
        <div className="w-full flex flex-col mt-8">
          <h1 className={`font-medium text-[17px] ${errors.complexity ? "text-red-500" : ""}`}>Select Complexity Level</h1>

          {/* Mapped Data */}
          <div className="flex items-center justify-between w-full h-auto mt-2">
            {oneThorughTen?.map((item: number, index: number) => (
              <div
                key={index}
                className={` ${complexityState === index + 1 ? "bg-blue-500 text-white" : "bg-blue-300"} cursor-pointer flex justify-center items-center rounded-full w-[35px] h-[35px]`}
                onClick={() => {
                  if (index + 1 === item) {
                    setComplexity(item);
                  }
                }}
              >
                {item}
              </div>
            ))}
          </div>
          {errors.complexity && <p className="ml-2 text-[11px] mt-1 text-red-500">Please Select A Number</p>}
        </div>

        {/* Date and Time */}
        <div className="w-full flex items-center justify-between mt-8">
          {/* Date */}
          <div className="w-full h-auto flex flex-col mr-4">
            <h1>Select Due Date</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker value={dateData} onChange={(newValue) => setDateData(newValue)} disablePast className={`${errors.date ? "bg-red-200" : ""}`} />
              </DemoContainer>
            </LocalizationProvider>
            {errors.date && <p className="ml-2 text-[11px] text-red-500">Please Add A Date</p>}
          </div>

          {/* Time */}
          <div className="w-full h-auto flex flex-col ml-4">
            <h1>Select Time</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker value={timeData} onChange={(newValue) => setTimeData(newValue)} className={`${errors.time ? "bg-red-200" : ""}`} />
              </DemoContainer>
            </LocalizationProvider>
            {errors.time && <p className="ml-2 text-[11px] text-red-500">Please Add A Time</p>}
          </div>
        </div>

        {/* Add Checklist */}
        <div className="mt-8 flex flex-col w-full h-auto">
          <h1>Add Checklist</h1>

          <div className={`searchBox w-full flex items-center  border ${errors.checkList ? "border-red-500" : "border-gray-300"} rounded-3xl bg-white mt-2 `}>
            <input type="text" placeholder="Search..." className="ml-5 outline-none w-full h-[50px] bg-inherit" value={textState.checkList} name="checkList" onChange={(e) => handleChange(e)} />
            <AddIcon
              className="mx-2 cursor-pointer bg-blue-400 rounded-full w-[30px] h-[30px] text-white"
              onClick={() => {
                addToList();
              }}
            />
          </div>

          {errors.checkList && <p className="text-[11px] text-red-500 ml-2">Please Enter an Check List</p>}

          {/* Mapped Data */}
          <div className="w-full flex flex-col h-auto mt-2">
            {addCheckList?.map((item: any, index: number) => (
              <CheckListCard item={item} index={index} key={index} deleteCheckListItem={deleteCheckListItem} />
            ))}
          </div>
        </div>

        {/* Add Tags */}
        <div className="mt-8 flex flex-col w-full h-auto">
          <h1>Add Tags</h1>

          <div className={`searchBox w-full flex items-center  border ${errors.addTags ? "border-red-500" : "border-gray-300"} rounded-3xl bg-white mt-2 `}>
            <input type="text" placeholder="Search..." className="ml-5 outline-none w-full h-[50px] bg-inherit" value={textState.addTags} name="addTags" onChange={(e) => handleChange(e)} />
            <AddIcon
              className="mx-2 cursor-pointer bg-blue-400 rounded-full w-[30px] h-[30px] text-white"
              onClick={() => {
                addToTagsFunc();
              }}
            />
          </div>

          {errors.addTags && <p className="text-[11px] text-red-500 ml-2">Please Enter a Tag</p>}

          {/* Mapped Data */}
          <div className="w-full flex flex-col h-auto mt-2">
            {addTagsList?.map((item: any, index: number) => (
              <TagListCard item={item} index={index} key={index} deleteCheckListItem={deleteTagsListItem} />
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center items-center mb-[50px]">
          <button
            className="mt-8 w-[50%] h-[45px] bg-blue-400 rounded-full "
            onClick={editArrayTodo}
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}

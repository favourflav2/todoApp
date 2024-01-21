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

export interface IAddTaskProps {}

export default function AddTask(props: IAddTaskProps) {
  let oneThorughTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // state for typing
  const [textState, setTextState] = React.useState({
    taskName:"",
    checkList:"",
    addTags:""
  })

  // error state
  const [errors, setErrors] = React.useState({
    taskName:false,
    checkList:false,
    addTags:false
  })

  // date and time state
  const [dateData, setDateData] = React.useState<Dayjs | null>(null);
  const [timeData, setTimeData] = React.useState<Dayjs | null>(null);

  // add checklist state
  const [addCheckList, setAddCheckList] = React.useState<Array<string>>([])
  const [addTagsList, setAddTagsList] = React.useState<Array<string>>([])

  // helper functions

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    setTextState(item => {
        return {
            ...item,
            [e.target.name] : e.target.value
        }
    })
  }

  function deleteCheckListItem(id:number){
    let newArr = addCheckList.slice()
    let res = newArr.filter((item,i) => i !== id)

    setAddCheckList(res)
  }

  function addToList(){
    
    if(!textState.checkList.length){
        setErrors(item => {
            return {
                ...item,
                checkList:true,
            }
        })
    }else{
        setAddCheckList((item) => [...item, textState.checkList])
        setTextState(item => {
            return {
                ...item,
                checkList:""
            }
        })
    }
  }

  function addToTagsFunc(){
    if(!textState.addTags.length){
        setErrors(item => {
            return {
                ...item,
                addTags:true,
            }
        })
    }else{
        setAddTagsList((item) => [...item, textState.addTags])
        setTextState(item => {
            return {
                ...item,
                addTags:""
            }
        })
    }
  }

  function deleteTagsListItem(id:number){
    let newArr = addTagsList.slice()
    let res = newArr.filter((item,i) => i !== id)

    setAddTagsList(res)
  }

  // React useEffects

  React.useEffect(()=>{
    if(errors.checkList === true){
        if(textState.checkList.length){
            setErrors(item => {
                return {
                    ...item,
                    checkList:false,
                }
            })
        }
    }

    if(errors.addTags === true){
        if(textState.addTags.length){
            setErrors(item => {
                return {
                    ...item,
                    addTags:false,
                }
            })
        }
    }
  },[errors,textState])



 
  return (
    <div className="w-full flex h-screen p-10 justify-center  bg-gray-100">


      {/* Content */}
      <div className="main-content w-[80%] lg:w-[50%] md:w-[60%] xl:w-[40%] 2xl:w-[30%] h-auto flex flex-col  ">
        {/* Title */}
        <div className="flex justify-center items-center relative w-full">
          <h1 className="title text-[28px] font-medium">Add New Task</h1>

          <ArrowBackIcon className=" absolute left-0 text-[30px]" />
        </div>

        {/* Name */}
        <div className="w-full h-auto flex flex-col mt-10">
          <h1 className="font-medium text-[17px]">Task Name</h1>
          <input type="text" name="taskName" value={textState.taskName} className=" outline-none border border-gray-300 rounded-3xl h-[50px] mt-2 indent-3" onChange={(e)=>handleChange(e)}/>
        </div>

        {/* Priority Level */}
        <div className="w-full flex flex-col mt-8">
          <h1 className="font-medium text-[17px]">Select Priority Level</h1>

          {/* Mapped Data */}
          <div className="flex items-center w-full h-auto mt-2">
            {oneThorughTen?.map((item: number, index: number) => (
              <div key={index} className={`${index === oneThorughTen.length - 1 ? 'mr-0' : 'mr-6'} bg-blue-200 flex justify-center items-center rounded-full w-[35px] h-[35px]`}>{item}</div>
            ))}
          </div>
        </div>

        {/* Complexity Level */}
        <div className="w-full flex flex-col mt-8">
          <h1 className="font-medium text-[17px]">Select Complexity Level</h1>

          {/* Mapped Data */}
          <div className="flex items-center w-full h-auto mt-2">
            {oneThorughTen?.map((item: number, index: number) => (
              <div key={index} className={`${index === oneThorughTen.length - 1 ? 'mr-0' : 'mr-6'} bg-blue-200 flex justify-center items-center rounded-full w-[35px] h-[35px]`}>{item}</div>
            ))}
          </div>
        </div>

        {/* Date and Time */}
        <div className="w-full flex items-center justify-between mt-8">
          {/* Date */}
          <div className="w-full h-auto flex flex-col mr-4">
            <h1>Select Due Date</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker value={dateData} onChange={(newValue) => setDateData(newValue)} disablePast />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          {/* Time */}
          <div className="w-full h-auto flex flex-col ml-4">
            <h1>Select Time</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker value={timeData} onChange={(newValue) => setTimeData(newValue)} />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        {/* Add Checklist */}
        <div className="mt-8 flex flex-col w-full h-auto">
          <h1>Add Checklist</h1>

          <div className={`searchBox w-full flex items-center  border ${errors.checkList ? "border-red-500" :"border-gray-300"} rounded-3xl bg-white mt-2 `}>
            <input type="text" placeholder="Search..." className="ml-5 outline-none w-full h-[50px] bg-inherit" value={textState.checkList} name="checkList" onChange={(e)=>handleChange(e)}/>
            <AddIcon className="mx-2 cursor-pointer bg-blue-400 rounded-full w-[30px] h-[30px] text-white" onClick={()=>{
                addToList()
            }}/>
          </div>

          {errors.checkList && <p className="text-[11px] text-red-500 ml-2">Please Enter an Check List</p>}

          {/* Mapped Data */}
          <div className="w-full flex flex-col h-auto mt-2">
            {
                addCheckList?.map((item:any,index:number)=>(
                    <CheckListCard item={item} index={index} key={index} deleteCheckListItem={deleteCheckListItem}/>
                ))
            }
          </div>


        </div>

        {/* Add Tags */}
        <div className="mt-8 flex flex-col w-full h-auto">
          <h1>Add Tags</h1>

          <div className={`searchBox w-full flex items-center  border ${errors.addTags ? "border-red-500" :"border-gray-300"} rounded-3xl bg-white mt-2 `}>
            <input type="text" placeholder="Search..." className="ml-5 outline-none w-full h-[50px] bg-inherit" value={textState.addTags} name="addTags" onChange={(e)=>handleChange(e)}/>
            <AddIcon className="mx-2 cursor-pointer bg-blue-400 rounded-full w-[30px] h-[30px] text-white" onClick={()=>{
                addToTagsFunc()
            }}/>
          </div>

          {errors.addTags && <p className="text-[11px] text-red-500 ml-2">Please Enter a Tag</p>}

          {/* Mapped Data */}
          <div className="w-full flex flex-col h-auto mt-2">
            {
                addTagsList?.map((item:any,index:number)=>(
                    <CheckListCard item={item} index={index} key={index} deleteCheckListItem={deleteTagsListItem}/>
                ))
            }
          </div>


        </div>


        <div className="w-full flex justify-center items-center">
        <button className="mt-8 w-[50%] h-[45px] bg-blue-400 rounded-full ">Save Task</button>
        </div>



      </div>



    </div>
  );
}

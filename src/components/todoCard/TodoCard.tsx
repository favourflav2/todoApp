import * as React from "react";
import { motion} from "framer-motion";
import dayjs from "dayjs";

import CircleIcon from "@mui/icons-material/Circle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";
import { Typography, Box, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "../../redux/store";
import { completeTask } from "../../redux/features/todoSlice";

export interface ITodoCardProps {
  item: {
    title: string;
    date: string;
    time: string;
    priority: number;
    complexity: number;
    percentage: any;
    checkList: Array<number | string>;
    tagList: Array<number | string>;
    isDone: boolean;
    createdAt: string;
  };
  id: number;
}



export default function TodosCard({ item, id }: ITodoCardProps) {
  // Redux States
  const navigate = useNavigate();
  const dispatch = Dispatch();

  // Current Date
  let today = new Date();
  let timeDiff = dayjs(item?.date).diff(today, "day");

  // Helper Function
  function determineLevel(level: number) {
    if (level <= 4) {
      return "Low";
    } else if (level <= 7) {
      return "Moderate";
    } else {
      return "High";
    }
  }

  function getPercentages(arr: Array<any>) {
    let highNum = 0;
    let checkedTask = 0;

    for (let item of arr) {
      if (item.completed === true) {
        checkedTask++;
      }
      highNum++;
    }

    let percentage = Number(((checkedTask / highNum) * 100).toFixed());

    return percentage;
  }
  function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} className="" size={50} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" className="font-semibold">{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <motion.div
      className={`w-full flex flex-col h-auto rounded-2xl ${item?.isDone ? "bg-green-200" : "bg-white"} p-4 my-3 border border-gray-200 relative`}
      initial={{ x: 300, opacity: 0, scale: 0.2 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5,ease: "easeOut", type:"spring" }}
      
    >
      {/* 1st Row */}
      <div className=" w-full flex items-center justify-between mb-3">
        {/* Left Side Title */}
        <div className="w-full h-auto flex items-center">
          <CircleIcon className={`${timeDiff === 0 ? "text-red-500" : timeDiff <= 3 ? "text-orange-500" : "text-blue-500"}`} />
          <h1 className={`ml-2 text-[18px] ${item?.isDone ? " line-through" : ""}`}>{item?.title}</h1>
        </div>

        {/* Right Side */}
        <div className="w-full flex items-center justify-end">
          <EditNoteIcon className="mr-2 text-[30px] text-gray-500 " onClick={() => navigate(`/editTask/${id}`)} />
          <CheckCircleIcon
            className={`mr-2 text-[30px] ${item?.isDone ? "text-blue-400" : "text-gray-500"}`}
            onClick={() => {
              dispatch(completeTask({ item, id }));
            }}
          />
        </div>
      </div>

      {/* 2nd Box */}
      <Tooltip title={<Typography className="text-[11px]">To Item Details</Typography>}>
        <div
          className="w-full flex flex-col h-auto "
          onClick={() => {
            navigate(`/item/${id}`);
          }}
        >
          <div className="w-full flex items-center my-1">
            <CalendarMonthIcon className="text-[25px] mr-1" />
            <h1>
              Due Date:{" "}
              <span className={`${timeDiff === 0 ? "text-red-500" : timeDiff <= 3 ? "text-orange-500" : "text-blue-500"} font-semibold`}>
                {timeDiff === 0 ? ` ${dayjs(item?.date).format("dddd")}` : timeDiff <= 3 ? `This ${dayjs(item?.date).format("dddd")}` : dayjs(item?.date).format("MMMM D, YYYY")} at {item?.time}
              </span>
            </h1>
          </div>

          <div className="w-full flex items-center my-1">
            <ArrowUpwardIcon className="text-[25px] mr-1" />
            <h1>
              Priority:{" "}
              <span className="font-semibold">
                {determineLevel(item?.priority)} ({item?.priority}/10)
              </span>
            </h1>
          </div>

          <div className="w-full flex items-center my-1 ">
            <QueryStatsIcon className="text-[25px] mr-1" />
            <h1>
              Complexity:{" "}
              <span className="font-semibold">
                {determineLevel(item?.complexity)} ({item?.complexity}/10)
              </span>
            </h1>
          </div>
        </div>
      </Tooltip>

      {/* 3rd Box */}
      <Tooltip title={<Typography className="text-[11px]">To Item Details</Typography>}>
        <div
          className="w-full flex items-center my-1"
          onClick={() => {
            navigate(`/item/${id}`);
          }}
        >
          {item?.tagList?.map((item: any, index: number) => (
            <div key={index} className="mx-2 bg-blue-200 p-1 rounded-3xl px-2 text-[13px]">
              <p>{item}</p>
            </div>
          ))}
        </div>
      </Tooltip>

      <Tooltip title={<Typography className="text-[11px]">To Item Details</Typography>}>
        <div
          className=" absolute right-[16px] bottom-1"
          onClick={() => {
            navigate(`/item/${id}`);
          }}
        >
          <CircularProgressWithLabel value={isNaN(getPercentages(item?.checkList)) ? 0 : getPercentages(item?.checkList)} />
        </div>
      </Tooltip>
    </motion.div>
  );
}

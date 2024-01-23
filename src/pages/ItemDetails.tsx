import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dispatch, UseSelector } from "../redux/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ItemDetailsTodoCard from "../components/todoCard/ItemDetailsTodoCard";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { checkOffTodo, deleteTodo, resetCheckOffTodo } from "../redux/features/todoSlice";
import { motion } from "framer-motion";

export default function ItemDetails() {
  // Redux state
  const { todos } = UseSelector((state) => state.todo);
  const dispatch = Dispatch();
  const { id } = useParams();
  const data = todos.find((item, index) => Number(index) === Number(id));
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-200 flex justify-center p-10">
      {/* Main Content */}
      <motion.div className="main-content flex flex-col w-full lg:w-[50%] md:w-[60%] xl:w-[40%] 2xl:w-[30%] " initial={{ x: 300 }} animate={{ x: 0 }} transition={{ duration: 0.6, type: "spring" }}>
        {/* Title */}
        <div className="flex items-center justify-between w-full">
          <ArrowBackIcon className="text-[28px]" onClick={() => navigate(-1)} />
          <h1 className="title text-[28px] font-medium">Task Details</h1>
          <EditNoteIcon className="text-[28px]" onClick={() => navigate(`/editTask/${id}`)} />
        </div>

        {/* Todo Card */}
        {data && (
          <div className="w-full h-auto my-7">
            <ItemDetailsTodoCard item={data} id={Number(id)} />
          </div>
        )}

        {/* CheckList */}
        <div className="w-full flex flex-col h-auto">
          <h1 className=" font-semibold">Checklist subtasks</h1>

          {data?.checkList?.length ? (
            data?.checkList?.map((item: any, index: number) => (
              <div key={index} className="w-full flex justify-between items-center px-4 rounded-3xl border border-gray-300 my-1 bg-white h-[50px]">
                <h1>{item.checkList}</h1>

                {item?.completed ? (
                  <CheckBoxIcon
                    className="text-blue-400"
                    onClick={() => {
                      dispatch(checkOffTodo({ item: item, index, idOfTodo: Number(id) }));
                    }}
                  />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    className="text-blue-400"
                    onClick={() => {
                      dispatch(checkOffTodo({ item: item, index, idOfTodo: Number(id) }));
                    }}
                  />
                )}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col mt-5">
          {data?.checkList?.length ? (
            <button
              className="bg-blue-500 rounded-full my-2 p-4 text-white font-bold"
              onClick={() => {
                dispatch(resetCheckOffTodo({ item: data?.checkList, idOfTodo: Number(id) }));
              }}
            >
              Repeat Task
            </button>
          ) : (
            <></>
          )}
          <button
            className="bg-red-500 rounded-full my-2 p-4 text-white font-bold"
            onClick={() => {
              dispatch(deleteTodo(id));
              navigate("/");
            }}
          >
            Delete Task
          </button>
        </div>
      </motion.div>
    </div>
  );
}

import { createSlice, current } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

interface Todo {
  title: string;
  date: string;
  time: string;
  priority: number;
  complexity: number;
  percentage: any;
  checkList: Array<any>;
  tagList: Array<number | string>;
}

interface TodoAppState {
  todos: Array<Todo>;
}

const initialState: TodoAppState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    checkOffTodo: (state, action) => {
      let arrayCheckList = state.todos.find((item, index) => index === action.payload.idOfTodo)?.checkList;
      //let look = state.todos.find((item,index)=> index === action.payload.idOfTodo)
      let index = state.todos.findIndex((item, index) => index === action.payload.idOfTodo);

      if (arrayCheckList) {
        let newObj = arrayCheckList?.map((item, index) => {
          if (index === action.payload.index) {
            return {
              ...item,
              completed: !item.completed,
            };
          } else {
            return {
              ...item,
            };
          }
        });

        //console.log((index))
        // console.log(current(look))
        //console.log(newObj,"mapped data")
        //console.log(newObj)

        //console.log(current(state.todos[index].checkList))

        state.todos[index].checkList = newObj;
      }
    },
    deleteTodo: (state, action) => {
      

      state.todos = state.todos.filter((item, index) => index !== Number(action.payload));
    },
    resetCheckOffTodo: (state, action) => {
      let whatToUpdate = action.payload.item;
      let updatedItem = whatToUpdate?.map((item: any) => {
        return {
          ...item,
          completed: false,
        };
      });

      state.todos[action.payload.idOfTodo].checkList = updatedItem;
    },
    editTodo: (state,action) => {
        
    }
  },
});

export default todoSlice.reducer;
export const { addTodo, checkOffTodo, deleteTodo, resetCheckOffTodo } = todoSlice.actions;

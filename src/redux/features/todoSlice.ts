import { createSlice } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

interface Todo {
    title: string;
    date:  string;
    time:  string;
    priority:  number;
    complexity:  number;
    percentage: any;
    checkList: Array<number | string>;
    tagList: Array<number | string>;
}

interface TodoAppState {
    todos: Array<Todo>
}

const initialState: TodoAppState = {
    todos: []
}

const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        addTodo: (state,action) => {
            state.todos = [...state.todos, action.payload]
        }
    }
})

export default todoSlice.reducer
export const {addTodo} = todoSlice.actions
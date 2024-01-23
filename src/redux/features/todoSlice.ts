import { createSlice } from "@reduxjs/toolkit";

export interface Todo {
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
  createdAt: string;
}

interface TodoAppState {
  todos: Array<Todo>;
  filterTags: Array<string | number>;
}

const initialState: TodoAppState = {
  todos: [],
  filterTags: [],
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
    editTodo: (state, action) => {
      //console.log(action.payload)
      state.todos[action.payload.id] = action.payload.data;
    },
    completeTask: (state, action) => {
      let { item } = action.payload;
      let copyData = state.todos.map(val => {
        if(val.createdAt === item.createdAt){
            return {
                ...val,
                isDone: !val.isDone
            }
        }else{
            return {
                ...val
            }
        }
      })
      

      state.todos = copyData
    },
    setFilteredTags: (state,action) => {
      let copyData = action.payload.slice();
      let newArr = copyData.map((item:any) => item.tagList);

      let res = ([] as any[]).concat(...newArr);

      // I had to map over the data and make everything lower case ... because a user could type the same tag ... it allowed for different cased dupilicates
      // TODO example GooD and Good would exsist in the array
      //* So I lowercased everything ... then removed the dupilcates ... then took the first Letter in the string and uppercased it ... getting everything back to their orginal form
      let caseSensitveResult = res.map(item => item.toLowerCase()).filter((value, index, array) => array.indexOf(value) === index).map(item => `${item.slice(0,1).toUpperCase() + item.slice(1,item.length)}`)
     

      state.filterTags = caseSensitveResult
    },
  },
});

export default todoSlice.reducer;
export const { addTodo, checkOffTodo, deleteTodo, resetCheckOffTodo, editTodo, completeTask, setFilteredTags } = todoSlice.actions;

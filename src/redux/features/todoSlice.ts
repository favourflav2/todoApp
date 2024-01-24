import { createSlice, current } from "@reduxjs/toolkit";

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
        
        // This is the array in the specific todo that contains the checklist items
        let arrayCheckList = state.todos.find((item) => item.createdAt === action.payload.id)?.checkList;

        // This is the index of the item we want to update/check off and on
        let index = state.todos.findIndex((item) => item.createdAt === action.payload.id);
        

        // We loop the array in which the checklist are ... if the index of the item in the checklist array matches the index in which we click 
        //* We return the opposite of that value
        // If theres no match we return the object as is
      if (arrayCheckList) {
        let newObj = arrayCheckList?.map((item, index) => {
          if (index === action.payload.indexOfChecklist) {
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
        
        // Our todos array at the postiion index ... we replace that array with our updated array
         state.todos[index].checkList = newObj;
       }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.createdAt !== action.payload);
    },
    resetCheckOffTodo: (state, action) => {
       let whatToUpdate = action.payload.item;
       const index = state.todos.findIndex(item => item.createdAt === action.payload.id)
       let updatedItem = whatToUpdate?.map((item: any) => {
         return {
           ...item,
           completed: false,
         };
       });

      state.todos[index].checkList = updatedItem;
    },
    editTodo: (state, action) => {
      const index = state.todos.findIndex(item => item.createdAt === action.payload.id)
      state.todos[index] = action.payload.data;
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

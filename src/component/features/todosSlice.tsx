 import { createSlice } from "@reduxjs/toolkit";
 import type { PayloadAction } from "@reduxjs/toolkit";

// types
interface Todo {
  id: string;
  text: string;
  done: boolean;
}

const initialState: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");


export const todosSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {

        // Todo App Feature Tracking => Add new todos

        addToDo: (state , action:PayloadAction<string>) => {
           const newTodo = ({id: Date.now().toString() , text: action.payload , done: false });
           state.push(newTodo)
           console.log(newTodo)
           console.log(newTodo.id)
        },

        // Toggle todo completion status (done/undone) 

       toggleToDo: (state , action:PayloadAction<string>) => {
        const todo = state.find(todo => todo.id === action.payload);
        if (todo) {
        todo.done = !todo.done;
        }
       },

        // Todo App Feature Tracking => Delete todo

        deleteToDo: (state , action:PayloadAction<string>) => {
           return state.filter(todo => todo.id !== action.payload)
        },

        // Todo App Feature Tracking => Drag & Drop reordering

        reorderTodos: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
            const { sourceIndex, destinationIndex } = action.payload;
            const [moved] = state.splice(sourceIndex, 1);
            state.splice(destinationIndex, 0, moved);
        },

        setTodos: (_state, action: PayloadAction<Todo[]>) => {
            return action.payload;
        }

    },
})

export const { addToDo , toggleToDo , deleteToDo , reorderTodos  } = todosSlice.actions;



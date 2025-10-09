import ToggleThemBtn from '../component/ToggleThemBtn';
import FilterToDo from '../component/FilterToDo';
import  { useState, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDo, toggleToDo, deleteToDo, reorderTodos } from '../component/features/todosSlice';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from "@hello-pangea/dnd";
import type { RootState, AppDispatch } from '../component/store/store';

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export default function ToDoApp() {
  const filter = useSelector((state: RootState) => state.filter);
  const todos = useSelector((state: RootState) => state.todos);
  const [text, setText] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !todo.done;
    if (filter === 'Completed') return todo.done;
    return true;
  });

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    dispatch(
      reorderTodos({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      })
    );
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && text.trim()) {
      dispatch(addToDo(text));
      setText('');
    }
  }

  return (
    <div className="relative w-full h-screen bg-white dark:bg-slate-900">
      <ToggleThemBtn />
      <FilterToDo />
      <div className="absolute bg-sky-50 dark:bg-slate-800 rounded-t-[5rem] w-full min-h-full top-20">
        <div className="flex items-center justify-center sm:justify-between bg-gradient-to-t from-violet-500 to-fuchsia-500 h-20 px-5 md:px-10 rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden text-white">
          <div>
            <h1 className="hidden sm:inline-block font-bold text-xl md:text-2xl">To Do List</h1>
          </div>

          {/* Todo App Feature Tracking => Add new todos */}
          <div className="flex items-center justify-center gap-x-2 w-full sm:w-auto">
            <input
              onKeyDown={handleKeyDown}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="New task..."
              className="font-semibold text-lg pb-3 p-2 outline-none border-none rounded-md dark:bg-slate-900/30 bg-blue-50/50 w-full sm:w-52 h-8 md:w-60 md:h-10 transition-all"
              type="text"
            />
            <div
              onClick={() => {
                if (text.trim()) {
                  dispatch(addToDo(text));
                  setText('');
                }
              }}
              className="flex items-center justify-center backdrop-blur-md h-8 w-8 md:h-10 md:w-10 rounded-md bg-blue-50/50 dark:bg-slate-900/30 hover:dark:bg-slate-900/50 hover:bg-blue-50/70 cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined">add</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mx-auto gap-2 px-4 my-2">
          {/* Todo App Feature Tracking => Drag & Drop reordering */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todoList">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-full"
                >
                  {filteredTodos.map((todo: Todo, index: number) => (
                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between w-full bg-violet-500/10 h-20 px-5 md:px-10 p-4 rounded-3xl text-sky-900 dark:text-slate-400 mb-2"
                        >
                          <div className="flex items-center gap-x-3 h-16">
                            {/* Toggle todo completion status (done/undone) */}
                            <span
                              onClick={() => dispatch(toggleToDo(todo.id))}
                              className="material-symbols-outlined cursor-pointer transition-all"
                            >
                              {!todo.done ? 'check_box_outline_blank' : 'check_box'}
                            </span>
                            <p
                              className={`${
                                todo.done ? 'line-through' : ''
                              } text-base md:text-lg font-semibold line-clamp-2`}
                            >
                              {todo.text}
                            </p>
                          </div>
                          <span
                            onClick={() => dispatch(deleteToDo(todo.id))}
                            className="material-symbols-outlined pl-3 cursor-pointer"
                          >
                            delete
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

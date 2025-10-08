import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { toggleToDo, deleteToDo } from "./features/todosSlice";

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export default function ToDo() {
  const todos = useAppSelector((state) => state.todos) as Todo[];
  const dispatch = useAppDispatch();

  return (
    <>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between w-full bg-violet-500/10 h-20 px-5 md:px-10 p-4 rounded-3xl text-sky-900 dark:text-slate-400 mb-2"
        >
          <div className="flex items-center gap-x-3 h-16">
            <span
              onClick={() => dispatch(toggleToDo(todo.id))}
              className="material-symbols-outlined cursor-pointer"
            >
              {todo.done ? "check_box" : "check_box_outline_blank"}
            </span>
            <p className="text-base md:text-lg font-semibold line-clamp-2">
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
      ))}
    </>
  );
}

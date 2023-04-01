
import { useEffect } from "react";

import { deleteTodo, getAllTodos, updateAndAdd } from "../redux/actions/index";
import { ALL_TODOS, DONE_TODOS, ACTIVE_TODOS } from "../redux/actions/type";

import { useDispatch, useSelector } from "react-redux";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// component
import Todo from "./Todo";
import Tabs from "./Tabs";

export const Todos = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  const currentTab = useSelector((state) => state.currentTab);

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  const getTodos = () => {
    if (currentTab === ALL_TODOS) {
      return todos;
    } else if (currentTab === ACTIVE_TODOS) {
      return todos.filter((todo) => !todo.done);
    } else if (currentTab === DONE_TODOS) {
      return todos.filter((todo) => todo.done);
    }
  };

  const removeDoneTodos = () => {
    todos.forEach(({ done, _id }) => {
      if (done) {
        dispatch(deleteTodo(_id));
      }
    });
  };


  const handleDragEnd = (results) => {
    const source=results.destination.index;
    const destination=results.source.index;
    const data={source,destination,todos};
    dispatch(updateAndAdd(data));
    console.log(data);
  };

  return (
    <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
      <article>
        <div>
          <Tabs currentTab={currentTab} />

          {todos.some((todo) => todo.done) ? (
            <button onClick={removeDoneTodos} className="button clear">
              Remove Done Todos
            </button>
          ) : null}
        </div>
        <Droppable droppableId={`${Math.random()}`}>
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {getTodos().map((todo, index) => (
                <Draggable draggableId={todo._id} index={index} key={todo._id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Todo key={todo._id} todo={todo} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </article>
    </DragDropContext>
  );
};

export default Todos;

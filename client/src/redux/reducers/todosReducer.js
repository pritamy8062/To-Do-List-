import * as actionTypes from "../actions/type";

export const todosReducers = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADDNEW_TODO:
      return [action.payload, ...state];
    case actionTypes.GETALL_TODO:
      return action.payload;
    case actionTypes.TOGGLE_TODO:
      return state.map((todo) =>
        todo._id === action.payload._id ? { ...todo, done: !todo.done } : todo
      );
    case actionTypes.UPDATE_TODO:
      return state.map((todo) =>
        todo._id === action.payload._id
          ? { ...todo, data: action.payload.data }
          : todo
      );
    case actionTypes.DELETE_TODO:
      return state.filter((todo) => todo._id !== action.payload._id);
    case actionTypes.PRITAM: {
      const data = action.payload;
      const arr = data.todos;
      const newEl = arr[data.source];
      const newEl2 = arr[data.destination];
      arr[data.source] = newEl2;
      arr[data.destination] = newEl;
      return arr;
    }

    default:
      return state;
  }
};

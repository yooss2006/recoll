import { Data, ReducerType } from "./type";
export const reducer = (state: Data[], action: ReducerType) => {
  let newState: Data[] = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "EDIT": {
      newState = state.map((item) =>
        item.title === action.data.title ? { ...action.data } : item
      );
      break;
    }
    case "REMOVE": {
      newState = state.filter((item) => item.title !== action.data.title);
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diaryData", JSON.stringify(newState));
  return newState;
};

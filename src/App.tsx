import React, { useContext, useEffect, useReducer, useState } from "react";
import { Data, ReducerType, onDataFunc, onRemoveFunc } from "./util/type";
import { dateArray, getStringDate } from "./util/date";
import DiaryEditor from "./components/DiaryEditor";
import DiaryList from "./components/DiaryList";
import "./css/common.css";

//useReducer
const reducer = (state: Data[], action: ReducerType) => {
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

//Context API
const DiaryStateContext = React.createContext<Data[] | null>(null);
const DiaryDispatchContext = React.createContext<{
  onCreate: onDataFunc;
  onEdit: onDataFunc;
  onRemove: onRemoveFunc;
  setIsEditorMode: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

//custom hook으로 null 방지
export const useContextState = () => {
  const state = useContext(DiaryStateContext);
  if (!state) throw new Error("Cannot find state");
  return state;
};
export const useContextOnFunc = () => {
  const func = useContext(DiaryDispatchContext);
  if (!func) throw new Error("Cannot find func");
  return func;
};

export function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [isEditorMode, setIsEditorMode] = useState(false);

  useEffect(() => {
    const localData = localStorage.getItem("diaryData");
    if (localData) {
      console.log(localData);
      const diaryList: Data[] = JSON.parse(localData);
      if (diaryList.length >= 1) {
        const filterData = diaryList
          .filter((item) =>
            dateArray().includes(getStringDate(new Date(item.title)))
          )
          .sort((a: Data, b: Data): number => {
            return (
              parseInt(b.title.split("-").join("")) -
              parseInt(a.title.split("-").join(""))
            );
          });
        dispatch({ type: "INIT", data: filterData });
      }
    }
  }, []);

  const onCreate = (title: string, content: string, emotion: string): void => {
    dispatch({
      type: "CREATE",
      data: {
        title: title,
        desc: content,
        emotion: emotion,
      },
    });
  };

  const onEdit = (title: string, content: string, emotion: string) => {
    dispatch({
      type: "EDIT",
      data: {
        title: title,
        desc: content,
        emotion: emotion,
      },
    });
  };

  const onRemove = (title: string) => {
    dispatch({
      type: "REMOVE",
      data: {
        title: title,
        desc: "",
        emotion: "",
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{ onCreate, onEdit, onRemove, setIsEditorMode }}
      >
        <div className="App">
          <main className="container">
            <h1>Recoll-Diary</h1>
            <DiaryList />
            <DiaryEditor firstData={data[0]} isEditorMode={isEditorMode} />
          </main>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

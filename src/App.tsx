import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import "./css/common.css";
import { Data, StateContext, OnFuncContext } from "./util/type";
import { reducer } from "./util/reducer";
import DiaryEditor from "./components/Editor/DiaryEditor";
import DiaryList from "./components/DiaryList/DiaryList";
import CheckSelectMode from "./components/SelectMode/CheckSelectMode";
import Calendar from "./components/SelectMode/Calendar";

//Context API
const DiaryStateContext = React.createContext<StateContext | null>(null);
const DiaryOnFunchContext = React.createContext<OnFuncContext | null>(null);

//custom hook으로 null 방지
export const useContextState = () => {
  const state = useContext(DiaryStateContext);
  if (!state) throw new Error("state를 찾을 수 없습니다.");
  return state;
};
export const useContextOnFunc = () => {
  const func = useContext(DiaryOnFunchContext);
  if (!func) throw new Error("해당 함수가 없습니다.");
  return func;
};

export function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [calendarMode, setCalendarMode] = useState({
    name: "calendar",
    isActivate: false,
    selectDate: "",
  });

  useEffect(() => {
    const localData = localStorage.getItem("diaryData");
    if (localData) {
      const diaryList: Data[] = JSON.parse(localData);
      if (diaryList.length >= 1) {
        const sortData = diaryList.sort((a: Data, b: Data): number => {
          return (
            parseInt(b.title.split("-").join("")) -
            parseInt(a.title.split("-").join(""))
          );
        });
        dispatch({ type: "INIT", data: sortData });
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

  const toggleEditMode = (isEdit: boolean) => {
    setIsEditorMode(isEdit);
  };

  const toggleCalendarMode = (isCalendarMode: boolean): void => {
    setCalendarMode({
      ...calendarMode,
      isActivate: isCalendarMode ? false : true,
    });
  };

  const calendarSelectDateChange = (date: string): void => {
    setCalendarMode({ ...calendarMode, isActivate: true, selectDate: date });
  };

  const memoizedFunc = useMemo(() => {
    return {
      onCreate,
      onEdit,
      onRemove,
      toggleCalendarMode,
      toggleEditMode,
      calendarSelectDateChange,
    };
  }, []);

  return (
    <DiaryStateContext.Provider value={{ data, calendarMode, isEditorMode }}>
      <DiaryOnFunchContext.Provider value={memoizedFunc}>
        <div className="App">
          <main className="container">
            <div className="mainContainer">
              <header>
                <h1>Recoll-Diary</h1>

                {calendarMode.isActivate ? <Calendar /> : null}
                <CheckSelectMode />
              </header>

              <DiaryList />
              {calendarMode.isActivate ? null : <DiaryEditor />}
            </div>
          </main>
        </div>
      </DiaryOnFunchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import "./css/common.css";
import { Data, onDataFunc, onRemoveFunc, ViewMode } from "./util/type";
import { reducer } from "./util/reducer";
import DiaryEditor from "./components/Editor/DiaryEditor";
import DiaryList from "./components/DiaryList/DiaryList";
import CheckSelectMode from "./components/SelectMode/CheckSelectMode";
import SelectMode from "./components/SelectMode/SelectMode";

//Context API
const DiaryStateContext = React.createContext<{
  data: Data[];
  viewMode: ViewMode;
} | null>(null);
const DiaryOnFunchContext = React.createContext<{
  onCreate: onDataFunc;
  onEdit: onDataFunc;
  onRemove: onRemoveFunc;
  setIsEditorMode: React.Dispatch<React.SetStateAction<boolean>>;
  calendarSelectDateChange: (date: string) => void;
} | null>(null);

//custom hook으로 null 방지
export const useContextState = () => {
  const state = useContext(DiaryStateContext);
  if (!state) throw new Error("Cannot find state");
  return state;
};
export const useContextOnFunc = () => {
  const func = useContext(DiaryOnFunchContext);
  if (!func) throw new Error("Cannot find func");
  return func;
};

export function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [viewMode, setViewMode] = useState({
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

  const calendarSelectDateChange = (date: string): void => {
    setViewMode({ ...viewMode, isActivate: true, selectDate: date });
  };

  const memoizedFunc = useMemo(() => {
    return {
      onCreate,
      onEdit,
      onRemove,
      setIsEditorMode,
      calendarSelectDateChange,
    };
  }, []);

  return (
    <DiaryStateContext.Provider value={{ data, viewMode }}>
      <DiaryOnFunchContext.Provider value={memoizedFunc}>
        <div className="App">
          <main className="container">
            <div className="mainContainer">
              <header>
                <h1>Recoll-Diary</h1>

                <CheckSelectMode
                  setViewMode={setViewMode}
                  isEditorMode={isEditorMode}
                />
              </header>

              <DiaryList />

              <DiaryEditor firstData={data[0]} isEditorMode={isEditorMode} />
            </div>
            {viewMode.isActivate ? <SelectMode /> : null}
          </main>
        </div>
      </DiaryOnFunchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

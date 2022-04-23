import { useEffect, useReducer, useRef, useState } from "react";
import "./css/common.css";
import DiaryEditor from "./components/DiaryEditor";
import { Data, ReducerType } from "./util/type";
import DiaryList from "./components/DiaryList";
import { dateArray, getStringDate } from "./util/date";

const dummyData: Data[] = [
  // { title: "2021-04-23", desc: "아주 좋다", emotion: "보통" },
  // { title: "2022-03-23", desc: "아주 좋다", emotion: "나쁨" },
  // {
  //   title: "2022-04-22",
  //   desc: "아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다",
  //   emotion: "좋음",
  // },
  // { title: "2022-04-23", desc: "아주 좋다", emotion: "보통" },
];

const reducer = (state: Data[], action: ReducerType) => {
  let newState: Data[] = [];
  switch (action.type) {
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [...state, newItem];
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
  return newState;
};

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  console.log(data);
  const [editorMode, setEditorMode] = useState("create");
  const curDate = new Date();

  const filterData = data
    .filter((item) =>
      dateArray(curDate).includes(getStringDate(new Date(item.title)))
    )
    .sort((a: Data, b: Data): number => {
      return (
        parseInt(b.title.split("-").join("")) -
        parseInt(a.title.split("-").join(""))
      );
    });

  const onCreate = (date: string, content: string, emotion: string): void => {
    dispatch({
      type: "CREATE",
      data: {
        title: date,
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
    <div className="App">
      <div className="container">
        <h1 className="blind">회상</h1>
        <DiaryList
          data={filterData}
          setEditorMode={setEditorMode}
          onRemove={onRemove}
        />
        <DiaryEditor
          data={filterData}
          onCreate={onCreate}
          onEdit={onEdit}
          editorMode={editorMode}
          setEditorMode={setEditorMode}
        />
      </div>
    </div>
  );
}

export default App;

import { useEffect, useReducer, useRef, useState } from "react";
import "./css/common.css";
import DiaryEditor from "./components/DiaryEditor";
import { Data, ReducerType } from "./util/type";
import DiaryList from "./components/DiaryList";
import { dateArray, getStringDate } from "./util/date";

const dummyData: Data[] = [
  { id: 0, title: "2021-04-22", desc: "아주 좋다", emotion: "보통" },
  { id: 1, title: "2022-03-21", desc: "아주 좋다", emotion: "나쁨" },
  {
    id: 2,
    title: "2022-04-14",
    desc: "아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다",
    emotion: "좋음",
  },
  // { id: 3, title: "2022-04-21", desc: "아주 좋다", emotion: "보통" },
];

const reducer = (state: Data[], action: ReducerType) => {
  let newState = [];
  switch (action.type) {
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [...state, newItem];
      break;
    }
    // case "REMOVE": {
    //   newState = state.filter((item) => item.id !== action.targetId);
    //   break;
    // }
    // case "EDIT": {
    //   newState = state.map((item) =>
    //     item.id === action.data.id ? { ...action.data } : item
    //   );
    //   break;
    // }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const curDate = new Date();
  const dataId = useRef(0);
  useEffect(() => {
    if (data.length >= 1) {
      dataId.current = data[data.length - 1].id + 1;
    }
  }, []);

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
        id: dataId.current,
        title: date,
        desc: content,
        emotion: emotion,
      },
    });
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="blind">회상</h1>
        <DiaryList data={filterData} />
        <DiaryEditor data={filterData} onCreate={onCreate} />
      </div>
    </div>
  );
}

export default App;

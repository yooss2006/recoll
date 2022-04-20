import React, { useState } from "react";
import "./css/common.css";
import DiaryEditor from "./components/DiaryEditor";
import { Data } from "./util/type";
import DiaryList from "./components/DiaryList";

const dummyData: Data[] = [
  {
    id: 0,
    title: "2022-04-13",
    desc: "아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다아주 좋다",
    emotion: 1,
  },
  { id: 1, title: "2022-04-20", desc: "아주 좋다", emotion: 2 },
  { id: 2, title: "2022-03-20", desc: "아주 좋다", emotion: 3 },
  { id: 3, title: "2021-04-20", desc: "아주 좋다", emotion: 1 },
];

export const DiaryDataContext = React.createContext<Data[] | null>(null);

function App() {
  const [data, setData] = useState(dummyData);
  return (
    <div className="App">
      <div className="container">
        <h1 className="blind">회상</h1>
        <DiaryDataContext.Provider value={data}>
          <DiaryList data={data} />
          <DiaryEditor />
        </DiaryDataContext.Provider>
      </div>
    </div>
  );
}

export default App;

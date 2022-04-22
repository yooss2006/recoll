import { useEffect, useState } from "react";
import Emotion from "./Emotion";
import { DataProps } from "../util/type";
import { dateArray, getStringDate } from "../util/date";

const DiaryItem = ({ data, setEditorMode }: DataProps) => {
  const [whatItemDay, setWhatItemDay] = useState("오늘");
  const isToday = getStringDate(new Date()) === data.title;
  useEffect(() => {
    switch (dateArray(new Date()).indexOf(data.title)) {
      case 0:
        setWhatItemDay("오늘");
        break;
      case 1:
        setWhatItemDay("어제");
        break;
      case 2:
        setWhatItemDay("일주일 전");
        break;
      case 3:
        setWhatItemDay("한달 전");
        break;
      case 4:
        setWhatItemDay("일년 전");
        break;
      default:
        break;
    }
  }, [data]);

  const handleEdit = () => {
    setEditorMode("edit");
  };

  return (
    <article className="DiaryItem">
      <header>
        <div className="title">
          <Emotion emotionWord={data.emotion} />
          <h3>{data.title}</h3>
        </div>
        <ul className={["btns", isToday ? "" : "hide"].join(" ")}>
          <li>
            <button onClick={handleEdit}>수정</button>
          </li>
          <li>
            <button>삭제</button>
          </li>
        </ul>
      </header>
      <p className="desc">
        <strong className="titleDesc">{whatItemDay}의 일기</strong>
        {data.desc}
      </p>
    </article>
  );
};

export default DiaryItem;

import { useEffect, useState } from "react";
import { Data } from "../util/type";
import Emotion from "./Emotion";
import { dateArray } from "../util/date";
type DiaryItemProps = {
  data: Data;
};

const DiaryItem = ({ data }: DiaryItemProps) => {
  const [whatItemDay, setWhatItemDay] = useState("오늘");
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
  }, [data.title]);

  return (
    <article className="DiaryItem">
      <div className="content">
        <div className="title">
          <Emotion emotionNumber={data.emotion} />
          <h3>{data.title}</h3>
        </div>
        <p className="desc">
          <strong className="titleDesc">{whatItemDay}의 일기</strong>
          {data.desc}
        </p>
      </div>
    </article>
  );
};

export default DiaryItem;

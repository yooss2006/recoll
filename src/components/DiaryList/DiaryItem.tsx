import React, { useCallback, useEffect, useState } from "react";
import Emotion from "../Emotion";
import { deteName, getStringDate } from "../../util/date";
import { useContextOnFunc, useContextState } from "../../App";
import { DataProps } from "../../util/type";

const DiaryItem = ({ data }: DataProps) => {
  const onfunc = useContextOnFunc();
  const isViewMode = useContextState().viewMode.isActivate;

  const [whatItemDay, setWhatItemDay] = useState("오늘");

  useEffect(() => {
    if (!isViewMode) setWhatItemDay(deteName(data.title));
  }, [data]);

  const isToday = getStringDate(new Date()) === data.title;

  const handleEdit = useCallback(() => {
    onfunc.setIsEditorMode(true);
  }, []);

  const handleRemove = useCallback(() => {
    if (window.confirm("정말로 삭제할까요?")) {
      onfunc.onRemove(data.title);
    }
  }, []);

  if (isViewMode) {
    return (
      <article className="DiaryItem">
        <header>
          <div className="title">
            <Emotion emotionWord={data.emotion} />
            <h3>{data.title}</h3>
          </div>
        </header>
        <p className="desc">{data.desc}</p>
      </article>
    );
  } else {
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
              <button onClick={handleRemove}>삭제</button>
            </li>
          </ul>
        </header>
        <p className="desc">
          <strong className="titleDesc">{whatItemDay}의 일기</strong>
          {data.desc}
        </p>
      </article>
    );
  }
};

DiaryItem.defaultProps = {
  data: {},
};

export default React.memo(DiaryItem);
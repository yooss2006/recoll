import React, { useEffect, useRef, useState } from "react";
import { useContextOnFunc, useContextState } from "../../App";
import { getStringDate } from "../../util/date";
import { EmotionList } from "../../util/emotionList";

const DiaryEditor = () => {
  const [content, setContent] = useState({ emotion: "보통", desc: "" });
  const isEditorMode = useContextState().isEditorMode;
  const firstData = useContextState().data[0];
  const onFunc = useContextOnFunc();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditorMode) {
      setContent({ emotion: firstData.emotion, desc: firstData.desc });
    }
  }, [isEditorMode]);

  const handleReset = () => {
    setContent({ emotion: "보통", desc: "" });
    onFunc.toggleEditMode(false);
  };

  const checkWriteTodayDiary = () => {
    if (firstData) {
      const todayDiaryIndex = firstData.title === getStringDate(new Date());
      if (todayDiaryIndex) return true;
      else return false;
    }
  };

  const handleSubmit = () => {
    if (content.desc.length < 5 && textareaRef.current) {
      textareaRef.current.focus();
      return;
    }
    //수정모드
    if (isEditorMode) {
      onFunc.onEdit(getStringDate(new Date()), content.desc, content.emotion);
      handleReset();
      return;
    }
    //오늘의 일기가 있을 경우
    if (checkWriteTodayDiary()) {
      alert("오늘의 일기를 작성하셨습니다.");
      handleReset();
      return;
    }
    //글 작성 모드
    onFunc.onCreate(getStringDate(new Date()), content.desc, content.emotion);
    handleReset();
  };

  return (
    <section className="DiaryEditor">
      <h2 className="blind">글 작성</h2>
      <dl className="todayEmotion">
        <dt>오늘의 기분 :</dt>
        <dd>
          <ul className="emotionList">
            {EmotionList.map((item) => (
              <li key={item.emotion_id}>
                <p className="blind">{item.desc}</p>
                <input
                  type="radio"
                  name="emotionCheck"
                  id={"emotionRadio" + item.emotion_id}
                  checked={content.emotion === item.desc}
                  onChange={() =>
                    setContent({ ...content, emotion: item.desc })
                  }
                />
                <label htmlFor={"emotionRadio" + item.emotion_id}>
                  {item.icon}
                </label>
              </li>
            ))}
          </ul>
        </dd>
      </dl>
      <textarea
        value={content.desc}
        placeholder={
          checkWriteTodayDiary()
            ? "오늘의 일기를 작성하셨습니다."
            : "오늘의 일기를 작성해보는 건 어떨까요?"
        }
        onChange={(e) => setContent({ ...content, desc: e.target.value })}
        ref={textareaRef}
      ></textarea>
      <div className="editorBtnWrapper">
        <button className="reset" onClick={handleReset}>
          입력지우기
        </button>
        <button className="submit" onClick={handleSubmit}>
          글쓰기
        </button>
      </div>
    </section>
  );
};

export default React.memo(DiaryEditor);

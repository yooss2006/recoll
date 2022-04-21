import { useRef, useState } from "react";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotionList";
import { DataEditorProps } from "../util/type";

const DiaryEditor = ({ data, onCreate }: DataEditorProps) => {
  const [emotion, setEmotion] = useState("보통");
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleReset = () => {
    setContent("");
    setEmotion("보통");
  };

  const checkWriteTodayDiary = () => {
    const todayDiaryIndex = data.findIndex(
      (item) => item.title === getStringDate(new Date())
    );
    if (todayDiaryIndex > -1) return true;
    else return false;
  };

  const handleSubmit = () => {
    if (content.length < 5 && textareaRef.current) {
      textareaRef.current.focus();
      return;
    }
    if (checkWriteTodayDiary()) {
      alert("오늘의 일기를 작성하셨습니다.");
      handleReset();
      return;
    }
    onCreate(getStringDate(new Date()), content, emotion);
    handleReset();
  };

  return (
    <section className="DiaryEditor">
      <h2 className="blind">글 작성</h2>
      <dl className="todayEmotion">
        <dt>오늘의 기분 :</dt>
        <dd>
          <ul className="emotionList">
            {emotionList.map((item) => (
              <li key={item.emotion_id}>
                <input
                  type="radio"
                  name="emotionCheck"
                  id={"emotionRadio" + item.emotion_id}
                  checked={emotion === item.desc}
                  onChange={() => setEmotion(item.desc)}
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
        value={content}
        placeholder={
          checkWriteTodayDiary()
            ? "오늘의 일기를 작성하셨습니다."
            : "오늘의 일기를 작성해보는 건 어떨까요?"
        }
        onChange={(e) => setContent(e.target.value)}
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

export default DiaryEditor;

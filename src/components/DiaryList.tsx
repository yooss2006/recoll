import { useState } from "react";
import { useContextState } from "../App";
import DiaryItem from "./DiaryItem";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SlideWrapper } from "../styles/styled";

const DiaryList = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const data = useContextState();

  const handleSlideNumber = (direction: string) => {
    if (direction === "left" && slideNumber !== 0)
      setSlideNumber(slideNumber - 1);
    else if (direction === "right" && slideNumber !== data.length - 1)
      setSlideNumber(slideNumber + 1);
  };

  return (
    <section className="DiaryList">
      <h2 className="blind">일기 리스트</h2>
      <button
        className={["slideBtn leftBtn", slideNumber === 0 ? "hide" : ""].join(
          " "
        )}
        onClick={() => {
          handleSlideNumber("left");
        }}
      >
        <MdKeyboardArrowLeft />
      </button>

      {data.length ? (
        <SlideWrapper
          width={data.length}
          translateX={100 / data.length}
          className={["slideWrapper", `slide${slideNumber}`].join(" ")}
        >
          {data.map((item) => (
            <DiaryItem key={item.title} data={item} />
          ))}
        </SlideWrapper>
      ) : (
        <div className="noneData">
          오늘, 어제, 일주일 전, 한달 전, 일년 전의 데이터가 없습니다.
        </div>
      )}

      <button
        className={[
          "slideBtn rightBtn",
          slideNumber === data.length - 1 || !data.length ? "hide" : "",
        ].join(" ")}
        onClick={() => {
          handleSlideNumber("right");
        }}
      >
        <MdKeyboardArrowRight />
      </button>
    </section>
  );
};

export default DiaryList;

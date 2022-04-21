import { useState } from "react";
import { DataArrayProps } from "../util/type";
import DiaryItem from "./DiaryItem";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SlideWrapper } from "../styles/styled";

const DiaryList = ({ data }: DataArrayProps) => {
  const [slideNumber, setSlideNumber] = useState(0);

  const handleSlideNumber = (direction: string) => {
    if (direction === "left" && slideNumber !== 0)
      setSlideNumber(slideNumber - 1);
    else if (direction === "right" && slideNumber !== data.length - 1)
      setSlideNumber(slideNumber + 1);
  };

  return (
    <section className="DiaryList">
      <h2>Recoll-Diary</h2>
      <div className="wrapper">
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

        <SlideWrapper
          width={data.length}
          translateX={100 / data.length}
          className={["slideWrapper", `slide${slideNumber}`].join(" ")}
        >
          {data.map((it, index) => (
            <DiaryItem key={index} data={it} />
          ))}
        </SlideWrapper>

        <button
          className={[
            "slideBtn rightBtn",
            slideNumber === data.length - 1 ? "hide" : "",
          ].join(" ")}
          onClick={() => {
            handleSlideNumber("right");
          }}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </section>
  );
};

DiaryList.defaultProps = {
  data: [],
};

export default DiaryList;

import React, { useState } from "react";
import { Data } from "../util/type";
import DiaryItem from "./DiaryItem";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { dateArray, getStringDate } from "../util/date";
type DiaryListProps = {
  data: Data[];
};

const DiaryList = ({ data }: DiaryListProps) => {
  const [slideNumber, setSlideNumber] = useState(0);
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
        <div className={["slideWrapper", `slide${slideNumber}`].join(" ")}>
          {filterData.map((it) => (
            <DiaryItem key={it.id} data={it} />
          ))}
        </div>

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

export default DiaryList;

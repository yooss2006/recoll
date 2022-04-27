import React, { useEffect, useState } from "react";
import { useContextState } from "../../App";
import DiaryItem from "./DiaryItem";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SlideWrapper } from "../../styles/styled";
import { dateArray, getStringDate } from "../../util/date";

const DiaryList = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const data = useContextState().data;
  const filterData = data.filter((item) =>
    dateArray().includes(getStringDate(new Date(item.title)))
  );
  const isViewMode = useContextState().viewMode.isActivate;
  const selectDate = useContextState().viewMode.selectDate;

  const handleSlideNumber = (direction: string) => {
    if (direction === "left" && slideNumber !== 0)
      setSlideNumber(slideNumber - 1);
    else if (direction === "right" && slideNumber !== data.length - 1)
      setSlideNumber(slideNumber + 1);
  };

  if (isViewMode) {
    const selectData = data.find((item) => item.title === selectDate);
    return (
      <section className="DiaryList">
        <h2 className="blind">일기</h2>
        <DiaryItem key={selectDate} data={selectData} />
      </section>
    );
  } else {
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

        {filterData.length ? (
          <SlideWrapper
            width={filterData.length}
            translateX={100 / filterData.length}
            className={["slideWrapper", `slide${slideNumber}`].join(" ")}
          >
            {filterData.map((item) => (
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
            slideNumber === filterData.length - 1 || !filterData.length
              ? "hide"
              : "",
          ].join(" ")}
          onClick={() => {
            handleSlideNumber("right");
          }}
        >
          <MdKeyboardArrowRight />
        </button>
      </section>
    );
  }
};

export default React.memo(DiaryList);

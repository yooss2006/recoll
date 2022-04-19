import React from "react";
import { Data } from "../util/type";
import DiaryItem from "./DiaryItem";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
type DiaryListProps = {
  data: Data[];
};

const DiaryList = ({ data }: DiaryListProps) => {
  return (
    <section className="DiaryList">
      <h2>yesterday</h2>
      <div className="wrapper">
        <button className="slideBtn leftBtn">
          <MdKeyboardArrowLeft />
        </button>
        <div className="slideWrapper">
          {data.map((it) => (
            <DiaryItem key={it.id} data={it} />
          ))}
        </div>
        <button className="slideBtn rightBtn">
          <MdKeyboardArrowRight />
        </button>
      </div>
    </section>
  );
};

export default DiaryList;

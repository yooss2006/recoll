import React from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { CheckSelectModeProps } from "../util/type";
const CheckSelectMode = ({ viewMode, setViewMode }: CheckSelectModeProps) => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <input
            type="checkBox"
            name="selectModeCheck"
            id="calendar"
            checked={
              // viewMode[0]은 달력
              viewMode[0].isActivate
            }
            onChange={() =>
              setViewMode(
                viewMode.map((item) =>
                  item.name === "calendar"
                    ? { name: "calendar", isActivate: !item.isActivate }
                    : item
                )
              )
            }
          />
          <label htmlFor="calendar">
            <BsFillCalendarDateFill />
          </label>
        </li>
        <li>
          <input
            type="checkBox"
            name="selectModeCheck"
            id="accountBook"
            checked={
              // viewMode[1]은 가계부
              viewMode[1].isActivate
            }
            onChange={() =>
              setViewMode(
                viewMode.map((item) =>
                  item.name === "accountBook"
                    ? { name: "accountBook", isActivate: !item.isActivate }
                    : item
                )
              )
            }
          />
          <label htmlFor="accountBook">
            <MdOutlineAttachMoney />
          </label>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(CheckSelectMode);

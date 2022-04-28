import React from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { useContextOnFunc, useContextState } from "../../App";
const CheckSelectMode = () => {
  const isCalendarMode = useContextState().calendarMode.isActivate;
  const isEditorMode = useContextState().isEditorMode;
  const toggleCalendarMode = useContextOnFunc().toggleCalendarMode;

  return (
    <nav className="nav">
      <ul>
        <li>
          <p className="blind">
            달력의 아이콘을 클릭하시면 달력 기능을 사용하실 수 있습니다.
          </p>
          <input
            type="checkBox"
            name="selectModeCheck"
            id="calendar"
            checked={isCalendarMode}
            onChange={() => {
              if (isEditorMode) {
                alert("수정 중엔 사용할 수 없습니다.");
                return;
              }
              toggleCalendarMode(isCalendarMode);
            }}
          />
          <label htmlFor="calendar">
            <BsFillCalendarDateFill />
          </label>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(CheckSelectMode);

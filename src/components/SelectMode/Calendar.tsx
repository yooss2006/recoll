import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useContextOnFunc, useContextState } from "../../App";
import { getStringDate } from "../../util/date";

const Calendar = () => {
  const data = useContextState().data;
  const calendarSelectDateChange = useContextOnFunc().calendarSelectDateChange;

  const [startDate, setStartDate] = useState(new Date(data[0].title));

  useEffect(() => {
    calendarSelectDateChange(getStringDate(startDate));
  }, [startDate]);

  const isWeekday = (date: Date) => {
    return data.findIndex((item) => item.title === getStringDate(date)) > -1;
  };

  return (
    <article className="calender">
      <h2>calender</h2>
      <DatePicker
        showPopperArrow={false}
        fixedHeight
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        filterDate={isWeekday}
      />
    </article>
  );
};

export default React.memo(Calendar);

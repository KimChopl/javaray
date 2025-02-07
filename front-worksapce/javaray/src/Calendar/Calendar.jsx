import { useEffect, useState } from "react";
import {
  CalDay,
  CalDayWeekend,
  CalMonth,
  CalTable,
  CalWeekday,
  CalWeekend,
  CalPreOrNext,
  CalTd,
} from "./CalendarCss";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const startDate = startOfWeek(startOfMonth(date));
  const endDate = endOfWeek(endOfMonth(date));
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const daysFormat = days.map((day, index) => ({
    date: format(day, "yyyy-MM--dd"),
    yaer: format(day, "yyyy"),
    month: format(day, "MM"),
    day: format(day, "dd"),
    weekIndex: getDay(day),
    index: index,
  }));

  const preBtn = () => {
    setDate(subMonths(date, 1));
    console.log(daysFormat);
  };
  const nextBtn = () => {
    setDate(addMonths(date, 1));
  };
  return (
    <>
      <CalTable>
        <thead>
          <tr>
            <CalMonth colSpan={7}>
              <CalPreOrNext onClick={preBtn}>{"<"}</CalPreOrNext>
              {date.getFullYear()}년 {date.getMonth() + 1}월{" "}
              <CalPreOrNext onClick={nextBtn}>{">"}</CalPreOrNext>
            </CalMonth>
          </tr>
          <tr>
            <CalDayWeekend>일</CalDayWeekend>
            <CalDay>월</CalDay>
            <CalDay>화</CalDay>
            <CalDay>수</CalDay>
            <CalDay>목</CalDay>
            <CalDay>금</CalDay>
            <CalDayWeekend>토</CalDayWeekend>
          </tr>
        </thead>
        <tbody>
          {daysFormat
            .reduce((rows, day, index) => {
              if (index % 7 === 0) {
                rows.push([]);
              }
              rows[rows.length - 1].push(day);

              return rows;
            }, [])
            .map((week, index) => (
              <tr key={index}>
                {week.map((day) => (
                  <CalTd key={day.index}>
                    {day.index % 7 === 0 || day.index % 7 === 6 ? (
                      <CalWeekend>{day.day}</CalWeekend>
                    ) : (
                      <CalWeekday>{day.day}</CalWeekday>
                    )}
                  </CalTd>
                ))}
              </tr>
            ))}
        </tbody>
      </CalTable>
    </>
  );
};

export default Calendar;

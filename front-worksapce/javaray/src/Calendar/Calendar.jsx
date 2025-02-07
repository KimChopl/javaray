import {  useState } from "react";
import {
  CalDay,
  CalDayWeekend,
  CalMonth,
  CalTable,
  CalWeekday,
  CalWeekend,
  CalPreOrNext,
  CalTd,
  GrayWeekEnd,
  GrayWeekday,
  GrayDiv,
  CalDiv,
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
  const toDayMonth = format(date, "MM");
  const toDay = new Date().getTime() - 86399999;
  const daysFormat = days.map((day, index) => ({
    date: format(day, "yyyy-MM-dd"),
    yaer: format(day, "yyyy"),
    month: format(day, "MM"),
    day: format(day, "dd"),
    weekIndex: getDay(day),
    index: index,
    dateNumber : day.getTime()
  }));

  const preBtn = () => {
    setDate(subMonths(date, 1));
  };
  const nextBtn = () => {
    setDate(addMonths(date, 1));
    console.log('현재시간 : ' || toDay)
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
            if (index % 7 === 0) rows.push([]);
            rows[rows.length - 1].push(day);
            return rows;
          }, [])
          .map((week, index) => (
            <tr key={index}>
              {week.map((day, dayIndex) => (
                <CalTd key={`${index}-${dayIndex}`}>
                  {day.dateNumber < toDay ? (
                    dayIndex % 7 === 0 || dayIndex % 7 === 6 ? (
                      <GrayDiv><GrayWeekEnd>{day.day}</GrayWeekEnd></GrayDiv>
                    ) : (
                      <GrayDiv><GrayWeekday>{day.day}</GrayWeekday></GrayDiv>
                    )
                  ) : (
                    dayIndex % 7 === 0 || dayIndex % 7 === 6 ? (
                      day.month === toDayMonth ? (
                        <CalDiv><CalWeekend>{day.day}</CalWeekend></CalDiv>
                      ) : (
                        <GrayDiv><GrayWeekEnd>{day.day}</GrayWeekEnd></GrayDiv>
                      )
                    ) : (
                      day.month === toDayMonth ? (
                        <CalDiv><CalWeekday>{day.day}</CalWeekday></CalDiv>
                      ) : (
                        <GrayDiv><GrayWeekday>{day.day}</GrayWeekday></GrayDiv>
                      )
                    )
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

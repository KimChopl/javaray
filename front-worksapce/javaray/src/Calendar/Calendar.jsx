import { useState } from "react";
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

const Calendar = ({data}) => {
  const [date, setDate] = useState(new Date());
  const startDate = startOfWeek(startOfMonth(date));
  const endDate = endOfWeek(endOfMonth(date));
  const {bookData, people, selectedDate, setSelectedDate, setPlayDate} = data
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const toDay = new Date().getTime() - 86399999;
  const daysFormat = days.map((day, index) => ({
    date: format(day, "yyyy-MM-dd"),
    yaer: format(day, "yyyy"),
    month: format(day, "MM"),
    day: format(day, "dd"),
    weekIndex: getDay(day),
    index: index,
    dateNumber: day.getTime(),
  }));

  const bookInfoMap = new Map(bookData.map(book => [book.playDate, book.bookPeopleNo]));

  const result = daysFormat.map(day => ({
    ...day,
    peoples: bookInfoMap.get(day.date) || 0
  }))

  const clickPlayDate = (e) => {
    if(e.date === selectedDate){
      setSelectedDate('')
    } else{
      setSelectedDate(e.date);
    }
  }  


  const preBtn = () => {
    setDate(subMonths(date, 1));
  };
  const nextBtn = () => {
    setDate(addMonths(date, 1));
  };
  return (
    <>
      <CalTable>
        <thead>
          {selectedDate !== '' ?
          <tr>
            <th colSpan={7}>선택한 날짜 : {selectedDate}</th>
          </tr>
           : <tr>
              <th colSpan={7} >&nbsp;</th>
            </tr>
             }
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
          {result
            .reduce((rows, day, index) => {
              if (index % 7 === 0) rows.push([]);
              rows[rows.length - 1].push(day);
              return rows;
            }, [])
            .map((week, index) => (
              <tr key={index}>
                {week.map((day, dayIndex) => (
                  <CalTd key={day.date} onClick={() => clickPlayDate({date: day.date, people: day.peoples})}>
                    {day.dateNumber < toDay ? (
                      dayIndex % 7 === 0 || dayIndex % 7 === 6 ? (
                        <GrayDiv>
                          <GrayWeekEnd>{day.day}</GrayWeekEnd>
                        </GrayDiv>
                      ) : (
                        <GrayDiv>
                          <GrayWeekday>{day.day}</GrayWeekday>
                        </GrayDiv>
                      )
                    ) : dayIndex % 7 === 0 || dayIndex % 7 === 6 ? (
                      day.people !== people ? (
                        <CalDiv>
                          <CalWeekend>{day.day}</CalWeekend>
                          <CalWeekday>{day.peoples}/{people}</CalWeekday>
                        </CalDiv>
                        ) : (
                          <GrayDiv>
                            <GrayWeekEnd>{day.day}</GrayWeekEnd>
                            <CalWeekday>마감</CalWeekday>
                          </GrayDiv>
                        )
                    ) :(
                      day.people !== people ? (
                        <CalDiv>
                          <CalWeekday>{day.day}</CalWeekday>
                          <CalWeekday>{day.peoples}/{people}</CalWeekday>
                        </CalDiv>
                      ) : (
                        <GrayDiv>
                          <GrayWeekday>{day.day}</GrayWeekday>
                          <CalWeekday>마감</CalWeekday>
                        </GrayDiv>
                      )
                    )}
                  </CalTd>
                ))}
              </tr>
            ))}
            <tr>
              <td colSpan={3} onClick={() => setPlayDate(selectedDate, 'playDate')}>
                확인
                </td>
              <td></td>
              <td colSpan={3}>취소</td>
            </tr>
        </tbody>
      </CalTable>
    </>
  );
};

export default Calendar;

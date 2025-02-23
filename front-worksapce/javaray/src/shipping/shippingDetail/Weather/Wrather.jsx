import { useEffect, useState } from "react";
import {
  AfterMoonP,
  DayDiv,
  DayP,
  Days,
  MomingP,
  TimeDiv,
  UnionDiv,
  UnionImg,
  WeatherImg,
  WeatherImgCover,
  WeatherWarp,
  WindAndTention,
} from "./Weather";
import wind from "./images/wind.png";
import burrow from "./images/burrow.png";
import alotofcloud from "./images/alotofcloud.png";
import cloudy from "./images/cloudy.png";
import littlecloud from "./images/littlecloud.png";
import rain from "./images/rain.png";
import snow from "./images/snow.png";
import snowandrain from "./images/snowandrain.png";
import sun from "./images/sun.png";

const Weather = (props) => {
  const weather = props.weather;
  const [day, setDay] = useState([]);
  const setWeather = {};
  const setWeatherObj = (i) => {
    const setting = {
      day: weather[i].tmef.substring(4, 8),
      s1: [weather[i].s1, weather[i + 1].s1],
      s2: [weather[i].s2, weather[i + 1].s2],
      sky: [weather[i].sky, weather[i + 1].sky],
      prep: [weather[i].prep, weather[i + 1].prep],
      wh1: [weather[i].wh1, weather[i + 1].wh1],
      wh2: [weather[i].wh2, weather[i + 1].wh2],
    };
    return setting;
  };
  useEffect(() => {
    const settingDay = [];
    if (weather[0].tmef.substring(8) === "1200") {
      settingDay.push({
        day: weather[0].tmef.substring(4, 8),
        s1: [weather[0].s1],
        s2: [weather[0].s2],
        sky: [weather[0].sky],
        prep: [weather[0].prep],
        wh1: [weather[0].wh1],
        wh2: [weather[0].wh2],
      });
      for (let i = 1; i < weather.length - 1; i++) {
        if (
          weather[i].tmef.substring(0, 8) ===
          weather[i + 1].tmef.substring(0, 8)
        ) {
          setWeather.setting = setWeatherObj(i);
          settingDay.push(setWeather.setting);
        }
      }
    } else {
      for (let i = 0; i < weather.length - 1; i++) {
        if (
          weather[i].tmef.substring(0, 8) ===
          weather[i + 1].tmef.substring(0, 8)
        ) {
          setWeather.setting = setWeatherObj(i);
          settingDay.push(setWeather.setting);
        }
      }
    }
    setDay([...settingDay]);
  }, []);
  return (
    
    <WeatherWarp>
        {day.map((day, index) => (
        <Days key={index}>
          <DayDiv>
            <DayP>
              {day.day.substring(0, 2)}월{day.day.substring(2, 4)}일
            </DayP>
          </DayDiv>
          <WeatherImgCover>
            {day.prep[1] ? (
              <WeatherImg
              src={
                day.prep[0] === "0"
                ? day.sky[0] === "DB01"
                ? sun
                : day.sky[0] === "DB02"
                ? littlecloud
                : day.sky[0] === "BD03"
                ? alotofcloud
                : cloudy
                : day.prep[0] === "1"
                ? rain
                : day.prep[0] === "2" || day.prep[0] === "3"
                ? snowandrain
                : snow
              }
              alt=""
              />
            ) : (
              ""
            )}
            {day.prep[1] ? (
              <WeatherImg
              src={
                day.prep[1] === "0"
                ? day.sky[1] === "DB01"
                ? sun
                : day.sky[1] === "DB02"
                ? littlecloud
                : day.sky[1] === "BD03"
                ? alotofcloud
                : cloudy
                : day.prep[1] === "1"
                ? rain
                : day.prep[1] === "2" || day.prep[0] === "3"
                ? snowandrain
                : snow
              }
              alt=""
              />
            ) : (
              <WeatherImg
              src={
                day.prep[0] === "0"
                ? day.sky[0] === "DB01"
                ? sun
                : day.sky[0] === "DB02"
                ? littlecloud
                : day.sky[0] === "BD03"
                ? alotofcloud
                : cloudy
                : day.prep[0] === "1"
                ? rain
                : day.prep[0] === "2" || day.prep[0] === "3"
                ? snowandrain
                : snow
              }
              alt=""
              />
            )}
          </WeatherImgCover>
          <WindAndTention>
            <UnionDiv>
              <UnionImg src={wind} alt="풍속" />
            </UnionDiv>
            <TimeDiv>
              <MomingP>
                {day.s1[0]}~{day.s2[0]}
              </MomingP>
            </TimeDiv>
            <TimeDiv>
              <AfterMoonP>
                {day.s1[1] ? day.s1[1] + "~" + day.s2[1] : "-"}
              </AfterMoonP>
            </TimeDiv>
          </WindAndTention>
          <WindAndTention>
            <UnionDiv>
              <UnionImg src={burrow} alt="파고" />
            </UnionDiv>
            <TimeDiv>
              <MomingP>
                {day.wh1[0]}~{day.wh2[0]}
              </MomingP>
            </TimeDiv>
            <TimeDiv>
              <AfterMoonP>
                {day.wh2[1] ? day.wh1[1] + "~" + day.wh2[1] : "-"}
              </AfterMoonP>
            </TimeDiv>
          </WindAndTention>
        </Days>
      ))}
      </WeatherWarp>
    );
  };
  
  export default Weather;
  
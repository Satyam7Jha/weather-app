import React from "react";

export default function WeatherCard(props: any) {
  return (
    <div className=" bg-[rgba(0,0,0,0.5)] mt-[130px]   p-10 rounded-lg ">
      <div className="flex-row flex ">
        <div className="flex-1">
          <div className="flex justify-center flex-col   text-white text-4xl mt-10">
            <img
              className="w-[100px] h-[100px] "
              style={{ marginTop: "-20px" }}
              src={"http:" + props.weather["current"]["condition"]["icon"]}
            />
            <div
              className="text-left text-[15px] text-white"
              style={{ marginTop: "-20px" }}
            >
              {props.weather["current"]["condition"]["text"]}, wind{" "}
              {props.weather["current"]["wind_kph"]}km/hr
            </div>
          </div>
        </div>
        <div className="text-[110px] items-center text-white ml-4">
          {props.weather["current"]["temp_c"]}°C
        </div>
      </div>
      <div className=" text-4xl text-white flex-row">
        <div>
          {" "}
          {props.weather["location"]["name"]}
          {", "}
          {props.weather["location"]["region"]}
          {". "}
        </div>
      </div>
    </div>
  );
}

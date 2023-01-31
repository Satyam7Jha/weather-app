import React from "react";
import { MdLocationOn } from "react-icons/md";

export default function CurrentWeather({
  liveLocationWeather,
}: {
  liveLocationWeather: any;
}) {
  if (liveLocationWeather === null) return <div></div>;
  return (
    <div>
      <div className=" bg-[rgba(0,0,0,0.5)]    p-4 m-4 rounded-lg text-white flex flex-row items-center">
        <MdLocationOn className="text-3xl" />
        <div>
          <img
            className="w-10 h-10"
            src={"http:" + liveLocationWeather["current"]["condition"]["icon"]}
          />
        </div>
        <div className="text-md items-center text-white ml-4">
          {liveLocationWeather["current"]["temp_c"]}°C
        </div>
        <div> {", " + liveLocationWeather["location"]["name"]}</div>
      </div>
    </div>
  );
}

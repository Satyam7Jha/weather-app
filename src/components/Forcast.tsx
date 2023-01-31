import React from "react";

export default function Forcast({ weather }: { weather: any }) {
  return (
    <div className="text-white mt-10 flex flex-row  justify-around gap-2    ">
      <ForcastCard weather={weather.forecast.forecastday[0]} />
      <ForcastCard weather={weather.forecast.forecastday[1]} />
      <ForcastCard weather={weather.forecast.forecastday[2]} />
    </div>
  );
}

const ForcastCard = ({ weather }: { weather: any }) => {
  const date = new Date(weather["date"]).toDateString();
  return (
    <div className=" bg-[rgba(0,0,0,0.5)] p-6 rounded-lg text-center ">
      <div>
        {date.slice(0, 4)}

        <img
          className="w-[100px] h-[100px] "
          src={"http:" + weather["day"]["condition"]["icon"]}
        />
        <div className="flex justify-between text-xl">
          <div>
            {weather["day"]["maxtemp_c"]}
            <sup>o</sup>
          </div>
          <div>
            {weather["day"]["mintemp_c"]}
            <sup>o</sup>
          </div>
        </div>
      </div>
    </div>
  );
};

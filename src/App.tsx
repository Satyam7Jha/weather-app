import React from "react";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [city, setCity] = React.useState("Bengaluru");
  const [weather, setWeather] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=eca6c7f85d1d4694847175019210211&q=${city}=no`
    )
      .then((response) => response.json())
      .then((json) => setWeather(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    fetchData();
    setLoading(false);
    console.log(weather);
    setCity("");
  };

  console.log(weather);

  return (
    <div className=' h-[100vh] flex items-center  flex-col bg-[url("https://wallpapercave.com/dwp2x/wp11599618.jpg")]  bg-no-repeat bg-cover  container'>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="absolute right-0 top-0 w-[300px] mb-10 p-2 mr-2 mt-4 flex flex-row border-2 justify-between rounded-md"
      >
        <input
          onChange={(e) => setCity(e.target.value)}
          type="text"
          className=" pl-2 bg-gray-100 border-2 border-gray-200 rounded-md w-[150px]"
          placeholder="Enter City"
          value={city}
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </form>
      {loading || weather === null ? (
        <div>Loading</div>
      ) : (
        <WeatherCard weather={weather} />
      )}
    </div>
  );
}

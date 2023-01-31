import React from "react";
import CurrentWeather from "./components/CurrentWeather";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [city, setCity] = React.useState("Delhi");
  const [weather, setWeather] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [backgroundImage, setBackgroundImage] = React.useState<string>(
    "https://wallpapercave.com/wp/wp6167951.jpg"
  );

  const [liveLocationWeather, setLiveLocationWeather] =
    React.useState<any>(null);

  React.useEffect(() => {
    const fetchDat = async (city: string) => {
      const x = await fetchData(city);
      setWeather(x);
    };
    fetchDat(city);
  }, []);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchLiveLoc(position.coords.latitude, position.coords.longitude);
      },
      (error) => console.error(error)
    );
  }, []);

  const fetchData = async (city: string) => {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=eca6c7f85d1d4694847175019210211&q=${city}=no`
    );
    const data = await res.json();
    setBackgroundImage(getBackGround(data.current.condition.text));
    return data;
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const x = await fetchData(city);
    setWeather(x);
    setLoading(false);
    setCity("");
  };

  const fetchLiveLoc = async (latitude: any, longitude: any) => {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    const res = await fetch(url);
    const data = await res.json();
    const res2 = await fetchData(data.city);
    setLiveLocationWeather(res2);
    setCurrentPositionWeather(true);
  };
  const [currentPositionWeather, setCurrentPositionWeather] =
    React.useState(false);

  const getBackGround = (status: string) => {
    status = status.toLowerCase();
    if (status.includes("clear") || status.includes("sun")) {
      return "https://wallpapercave.com/dwp1x/wp8383953.jpg";
    } else if (status.includes("rain")) {
      return "https://wallpapercave.com/wp/Z0kmvgB.jpg";
    } else if (status.includes("snow")) {
      return "https://wallpapercave.com/dwp2x/wp11843674.jpg";
    } else if (status.includes("overcast")) {
      return "https://wallpapercave.com/dwp1x/wp9626298.jpg";
    } else if (status.includes("clou")) {
      return "https://wallpapercave.com/dwp1x/wp11125204.jpg";
    } else if (status.includes("fog") || status.includes("mist")) {
      return "https://wallpapercave.com/dwp2x/wp11383718.jpg";
    }
    return "https://wallpapercave.com/wp/wp6167951.jpg";
  };

  return (
    <div
      className=" h-[100vh] flex items-center  flex-col  bg-no-repeat bg-cover  container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute left-0">
        {currentPositionWeather ? (
          <CurrentWeather liveLocationWeather={liveLocationWeather} />
        ) : (
          <div
            onClick={() => {
              setCurrentPositionWeather(true);
            }}
            className=" bg-[rgba(0,0,0,0.5)]    p-4 m-4 rounded-lg text-white flex flex-row items-center"
          >
            Loading..{" "}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="absolute right-0 top-0 w-[300px] mb-10 p-2 mr-2 mt-4 flex flex-row border-2 justify-between rounded-md"
      >
        <input
          required
          onChange={(e) => setCity(e.target.value)}
          type="text"
          className=" pl-2 bg-gray-100 border-2 border-gray-200 rounded-md w-[180px]"
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
        <div></div>
      ) : (
        <WeatherCard weather={weather} loading={loading} />
      )}
    </div>
  );
}

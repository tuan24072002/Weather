import { FormEvent, useCallback, useEffect, useState } from "react";
import Assets from "../assets";
import "./Weather.css";
import toast from 'react-hot-toast';
import { useAppContext } from "../context/AppContext";
const Weather = () => {
    const { lang } = useAppContext();
    const [city, setCity] = useState<string>("");
    const [weatherData, setWeatherData] = useState<WeatherType>();
    const search = useCallback(async (cityName: string) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=${lang}&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                toast.dismiss();
                return toast.error(`${lang === "vi" ? "Lỗi" : "Error"} ${data.cod}: ${data.message}`);
            }
            if (data.cod !== 200 && data.cod !== "200") {
                toast.dismiss();
                return toast.error(`${lang === "vi" ? "Lỗi" : "Error"} ${data.cod}: ${data.message}`);
            }

            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather[0].icon,
                description: data.weather[0].description
            });
        } catch (error) {
            console.log(error);
            toast.dismiss();
            toast.error((error as Error).message);
        }
    }, [lang])
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (city === "") return;
        search(city);
    }
    useEffect(() => {
        if (city !== "") search(city);
        else search("Ho Chi Minh");
    }, [lang, search])

    return (
        <div className="weather">
            <form onSubmit={handleSubmit} className="search-bar">
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={lang === "vi" ? "Tìm kiếm..." : "Search..."} />
                <button>
                    <img src={Assets.search} alt="Search Icon" />
                </button>
            </form>
            <div className="weather-info">
                <img src={`https://openweathermap.org/img/wn/${weatherData?.icon}@4x.png`} alt="Weather Icon" className="weather-icon" />
                <p>{weatherData?.description[0].toUpperCase()}{weatherData?.description.slice(1)}</p>
            </div>
            <p className="temperature">{weatherData?.temperature}°C</p>
            <p className="location">{weatherData?.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={Assets.humidity} alt="Humidity Icon" />
                    <div className="">
                        <p className="humidity-percent">{weatherData?.humidity}%</p>
                        <span className="humidity-text">{lang === "vi" ? "Độ ẩm" : "Humidity"}</span>
                    </div>
                </div>
                <div className="col">
                    <img src={Assets.wind} alt="Wind Icon" />
                    <div className="">
                        <p className="wind-percent">{weatherData?.wind} km</p>
                        <span className="wind-text">{lang === "vi" ? "Tốc độ gió" : "Wind Speed"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather
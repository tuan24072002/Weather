type WeatherType = {
  humidity: number;
  wind: number;
  temperature: number;
  location: string;
  icon: string;
  description: string;
};
type AppContextType = {
  lang: "vi" | "en";
  setLang: React.Dispatch<React.SetStateAction<"vi" | "en">>;
};

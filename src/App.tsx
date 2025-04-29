import Weather from "./components/Weather"
import { Toaster } from 'react-hot-toast';
import { useAppContext } from "./context/AppContext";
const App = () => {
  const { lang, setLang } = useAppContext();
  return (
    <div className="app">
      <Weather />
      <Toaster />
      <div className="change-language">
        <select name="lang" id="lang" value={lang} onChange={(e) => setLang(e.target.value as "vi" | "en")}>
          <option value="vi">Vi</option>
          <option value="en">En</option>
        </select>
      </div>
    </div>
  )
}

export default App
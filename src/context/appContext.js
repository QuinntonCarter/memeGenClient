import { useState, createContext } from "react";
import axios from "axios";

const { REACT_APP_IMGFLIP_URL } = process.env;

export const AppContext = createContext();
export const imgFlipAxios = axios.create();
imgFlipAxios.interceptors.request.use((config) => {
  config.baseURL = REACT_APP_IMGFLIP_URL;
  return config;
});
export default function AppProvider({ children }) {
  const [randomMeme, setRandomMeme] = useState({});
  const [errors, setErrors] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        errors,
        setErrors,
        randomMeme,
        setRandomMeme,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

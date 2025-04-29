import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<AppContextType | undefined>(undefined);
export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [lang, setLang] = useState<"vi" | "en">("vi");
    const value = {
        lang,
        setLang
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("");
    }
    return context;
}
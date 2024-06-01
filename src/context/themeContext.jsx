import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [themeButtonClicked, setThemeButtonClicked] = useState(false);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, themeButtonClicked, setThemeButtonClicked }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
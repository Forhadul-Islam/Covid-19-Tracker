import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

function ThemeContextProvider(props) {
  const [theme, setTheme] = useState({
    app_background: {
      backgroundColor: "black",
    },
  });
  return (
    <ThemeContext.Provider value={"hello"}>
      {props.childern}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;

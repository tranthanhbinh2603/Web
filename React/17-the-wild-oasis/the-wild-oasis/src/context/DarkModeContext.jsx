import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

/* eslint-disable react/prop-types */
function DarkModeProvider({ children }) {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState("isDarkMode", false);

	const toggleDarkMode = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark-mode");
		} else {
			document.documentElement.classList.remove("dark-mode");
		}
	}, [isDarkMode]);

	return (
		<DarkModeContext.Provider
			value={{
				isDarkMode,
				toggleDarkMode,
			}}
		>
			{children}
		</DarkModeContext.Provider>
	);
}

export { DarkModeContext, DarkModeProvider };

// How to import in parents:
// <DarkModeProvider></DarkModeProvider>

// How to use:
// const {/*id you want*/} = useContext(DarkModeContext)
// Ex: const { add, delete } = useContext(DarkModeContext)

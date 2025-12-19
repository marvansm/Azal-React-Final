import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import LoadingScreen from "../Components/LoadingScreen";

interface LoadingContextType {
  triggerLoading: (duration?: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { i18n } = useTranslation();
  const location = useLocation();
  const [lastPath, setLastPath] = useState(location.pathname);

  const triggerLoading = (duration = 1000) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, duration);
  };

  useEffect(() => {
    if (location.pathname !== lastPath) {
      triggerLoading();
      setLastPath(location.pathname);
    }
  }, [location.pathname, lastPath]);

  useEffect(() => {
    const handleLanguageChange = () => {
      triggerLoading();
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <LoadingContext.Provider value={{ triggerLoading }}>
      {isLoading && <LoadingScreen />}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

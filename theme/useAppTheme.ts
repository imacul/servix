import { useColorScheme } from "react-native";
import { createTheme } from "./theme";

export const useAppTheme = () => {
  const scheme = useColorScheme();
  return createTheme(scheme);
};

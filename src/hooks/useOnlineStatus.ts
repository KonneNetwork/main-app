import { userStore } from "@/store/userStore";
import { useEffect } from "react";
import { AppState } from "react-native";


export const useOnlineStatus = () => {
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "active" || nextAppState === "background") {
        userStore.getState().setOnlineStatus(true);
      } else if (nextAppState === "inactive") {
        userStore.getState().setOnlineStatus(false);
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);
};

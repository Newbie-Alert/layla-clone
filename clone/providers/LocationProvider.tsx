import * as Location from "expo-location";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface ILocationContext {
  location: Location.LocationObject | null;
  errorMsg: string;
}

const locationContext = createContext<ILocationContext>({
  location: null,
  errorMsg: "",
});

export default function LocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();

      if (status === "granted") {
        setErrorMsg("위치 정보 제공 동의가 필요합니다.");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    getLocation();
  }, []);

  return (
    <locationContext.Provider value={{ location, errorMsg }}>
      {children}
    </locationContext.Provider>
  );
}

export const useLocationContext = () => {
  const context = useContext(locationContext);
  return context;
};

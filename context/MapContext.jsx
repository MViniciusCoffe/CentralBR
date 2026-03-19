import { useState, useContext, createContext } from "react";

const MapContext = createContext();

export function MapProvider({ children }) {
  const [mapLevel, setMapLevel] = useState("states");

  return (
    <MapContext.Provider value={{ mapLevel, setMapLevel }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  return useContext(MapContext);
}

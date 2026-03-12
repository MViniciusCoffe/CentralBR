import { useMap } from "../../../../context/MapContext";
import styles from "./ViewTabs.module.css";

export default function MapTab() {
  const {mapLevel, setMapLevel} = useMap();

  return (
    <>
      <h2>Configurações do Mapa</h2>

      <div className={styles.optionGroup}>
        <h3>Nível de Visualização</h3>

        <ul>
          <li>
            <label>
              <input
                type="radio"
                name="mapLevel"
                value="regions"
                checked={mapLevel === "regions"}
                onChange={() => setMapLevel("regions")}
              />
              Regiões
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="mapLevel"
                value="states"
                checked={mapLevel === "states"}
                onChange={() => setMapLevel("states")}
              />
              Estados
            </label>
          </li>
        </ul>
      </div>
    </>
  );
}

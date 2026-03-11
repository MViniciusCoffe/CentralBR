import { useState } from "react";
import styles from "./Sections.module.css";

import MapTab from "./viewTabs/MapTab";
import StyleTab from "./viewTabs/StyleTab";

export default function ViewSection() {
  const [tab, setTab] = useState("map");

  return (
    <>
      <div className={styles.lateralMenu}>
        <ul>
          <li onClick={() => setTab("map")} className={tab === "map" ? styles.selected : ""}>
            <p>Mapa</p>
          </li>
          <li onClick={() => setTab("style")} className={tab === "style" ? styles.selected : ""}>
            <p>Estilo</p>
          </li>
        </ul>
      </div>
      <div className={styles.menuContent}>
        {tab === "map" && <MapTab />}
        {tab === "style" && <StyleTab />}
      </div>
    </>
  );
}

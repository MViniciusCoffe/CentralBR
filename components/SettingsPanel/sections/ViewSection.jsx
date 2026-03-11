import { useState } from "react";
import styles from "./Sections.module.css";

export default function ViewSection() {
  const [tab, setTab] = useState("map");

  return (
    <>
      <div className={styles.lateralMenu}>
        <ul>
          <li onClick={() => setTab("map")}>
            <p>Mapa</p>
          </li>
          <li onClick={() => setTab("style")}>
            <p>Estilo</p>
          </li>
        </ul>
      </div>
      <div className={styles.menuContent}>
        {tab === "map"}
        {tab === "style"}
      </div>
    </>
  );
}

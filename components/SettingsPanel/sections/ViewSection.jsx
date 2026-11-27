"use client";

import { useState } from "react";
import styles from "./Sections.module.css";

import MapTab from "./viewTabs/MapTab";
import StyleTab from "./viewTabs/StyleTab";

const TABS = [
  { id: "map", label: "Mapa" },
  { id: "style", label: "Estilo" },
];

export default function ViewSection() {
  const [tab, setTab] = useState("map");

  return (
    <>
      <div className={styles.lateralMenu}>
        <ul>
          {TABS.map(({ id, label }) => (
            <li key={id} className={tab === id ? styles.selected : ""}>
              <button
                type="button"
                className={styles.tabButton}
                aria-pressed={tab === id}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.menuContent}>
        {tab === "map" && <MapTab />}
        {tab === "style" && <StyleTab />}
      </div>
    </>
  );
}

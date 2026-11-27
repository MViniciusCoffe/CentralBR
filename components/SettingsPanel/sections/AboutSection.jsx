"use client";

import { useState } from "react";
import AuthorTab from "./aboutTabs/AuthorTab";
import ControlsTab from "./aboutTabs/ControlsTab";
import ProjectTab from "./aboutTabs/ProjectTab";
import SourcesTab from "./aboutTabs/SourcesTab";
import styles from "./Sections.module.css";

const TABS = [
  { id: "project", label: "Projeto" },
  { id: "author", label: "Autor" },
  { id: "controls", label: "Controles" },
  { id: "sources", label: "Fontes" },
];

export default function AboutSection() {
  const [tab, setTab] = useState("project");

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
        {tab === "project" && <ProjectTab />}
        {tab === "author" && <AuthorTab />}
        {tab === "controls" && <ControlsTab />}
        {tab === "sources" && <SourcesTab />}
      </div>
    </>
  );
}

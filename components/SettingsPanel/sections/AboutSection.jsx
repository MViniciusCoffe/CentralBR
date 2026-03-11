import { useState } from "react";
import styles from "./Sections.module.css";

import ProjectTab from "./aboutTabs/ProjectTab";
import AuthorTab from "./aboutTabs/AuthorTab";
import ControlsTab from "./aboutTabs/ControlsTab";
import SourcesTab from "./aboutTabs/SourcesTab";

export default function AboutSection() {
  const [tab, setTab] = useState("project");

  return (
    <>
      <div className={styles.lateralMenu}>
        <ul>
          <li onClick={() => setTab("project")} className={tab === "project" ? styles.selected : ""}>
            <p>Projeto</p>
          </li>
          <li onClick={() => setTab("author")} className={tab === "author" ? styles.selected : ""}>
            <p>Autor</p>
          </li>
          <li onClick={() => setTab("controls")} className={tab === "controls" ? styles.selected : ""}>
            <p>Controles</p>
          </li>
          <li onClick={() => setTab("sources")} className={tab === "sources" ? styles.selected : ""}>
            <p>Fontes</p>
          </li>
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

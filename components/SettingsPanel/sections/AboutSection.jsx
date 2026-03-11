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
          <li onClick={() => setTab("project")}>
            <p>Projeto</p>
          </li>
          <li onClick={() => setTab("author")}>
            <p>Autor</p>
          </li>
          <li onClick={() => setTab("controls")}>
            <p>Controles</p>
          </li>
          <li onClick={() => setTab("sources")}>
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

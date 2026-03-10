import styles from "./Panel.module.css";
import Image from "next/image";
import { useState } from "react";

import ProjectTab from "./tabs/ProjectTab";
import AuthorTab from "./tabs/AuthorTab";
import ControlsTab from "./tabs/ControlsTab";
import SourcesTab from "./tabs/SourcesTab";

export default function SettingsPanel({ open, setOpen }) {
  const [tab, setTab] = useState("project");

  return (
    <div className={`${styles.panel} ${open ? styles.open : ""}`}>
      <div className={styles.topMenu}>
        <ul>
          <li className={`${styles.menuIcon} ${styles.selected}`}>
            <Image
              src="/img/info-icon.png"
              alt="Sobre"
              width={30}
              height={30}
              draggable="false"
              className={styles.icon}
            />
            <p>Sobre</p>
          </li>
        </ul>
      </div>
      <div className={styles.bottomMenu}>
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
            <li onClick={() => setOpen(false)}>
              <p>Sair do Menu</p>
            </li>
          </ul>
        </div>
        <div className={styles.menuContent}>
          {tab === "project" && <ProjectTab />}
          {tab === "author" && <AuthorTab />}
          {tab === "controls" && <ControlsTab />}
          {tab === "sources" && <SourcesTab />}
        </div>
      </div>
    </div>
  );
}

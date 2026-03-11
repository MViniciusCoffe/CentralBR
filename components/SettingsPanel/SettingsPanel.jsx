import styles from "./Panel.module.css";
import Image from "next/image";
import { useState } from "react";

import AboutSection from "./sections/AboutSection";
import ViewSection from "./sections/ViewSection";

export default function SettingsPanel({ open, setOpen }) {
  const [section, setSection] = useState("about");

  return (
    <div className={`${styles.panel} ${open ? styles.open : ""}`}>
      <div className={styles.topMenu}>
        <ul>
          <li
            className={`${styles.menuIcon} ${section === "about" ? styles.selected : ""}`}
            onClick={() => setSection("about")}
          >
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
          <li
            className={`${styles.menuIcon} ${section === "view" ? styles.selected : ""}`}
            onClick={() => setSection("view")}
          >
            <Image
              src="/img/eye-icon.png"
              alt="Vista"
              width={30}
              height={30}
              draggable="false"
              className={`${styles.icon} ${styles.eyeIcon}`}
            />
            <p>Vista</p>
          </li>
          <li
            className={`${styles.menuIcon}`}
            onClick={() => setOpen(false)}
          >
            <Image
              src="/img/exit-icon.png"
              alt="Fechar"
              width={30}
              height={30}
              draggable="false"
              className={`${styles.icon} ${styles.exitIcon}`}
            />
            <p>Fechar</p>
          </li>
        </ul>
      </div>
      <div className={styles.bottomMenu}>
        {section === "about" && <AboutSection />}
        {section === "view" && <ViewSection />}
      </div>
    </div>
  );
}

import styles from "./Panel.module.css";
import Image from "next/image";
import { useState } from "react";

import AboutSection from "./sections/AboutSection";

export default function SettingsPanel({ open, setOpen }) {
  const [section, setSection] = useState("about")

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
          <li className={`${styles.menuIcon}`}>
            <Image
              src="/img/eye-icon.png"
              alt="Vista"
              width={30}
              height={30}
              draggable="false"
              className={styles.icon}
            />
            <p>Vista</p>
          </li>
        </ul>
      </div>
      <div className={styles.bottomMenu}>
        {section === "about" && <AboutSection />}
      </div>
    </div>
  );
}

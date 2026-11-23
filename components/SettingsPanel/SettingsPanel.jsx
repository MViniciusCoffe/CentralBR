import Image from "next/image";
import { useState } from "react";
import styles from "./Panel.module.css";

import AboutSection from "./sections/AboutSection";
import ViewSection from "./sections/ViewSection";

export default function SettingsPanel({ open, setOpen }) {
  const [section, setSection] = useState("about");

  return (
    <div className={`${styles.panel} ${open ? styles.open : ""}`}>
      <div className={styles.topMenu}>
        <ul>
          <li className={section === "about" ? styles.selected : ""}>
            <button
              type="button"
              className={styles.menuIcon}
              aria-pressed={section === "about"}
              onClick={() => setSection("about")}
            >
              <Image
                src="/img/info-icon.png"
                alt=""
                width={30}
                height={30}
                draggable="false"
                className={styles.icon}
              />
              <span>Sobre</span>
            </button>
          </li>
          <li className={section === "view" ? styles.selected : ""}>
            <button
              type="button"
              className={styles.menuIcon}
              aria-pressed={section === "view"}
              onClick={() => setSection("view")}
            >
              <Image
                src="/img/eye-icon.png"
                alt=""
                width={30}
                height={30}
                draggable="false"
                className={`${styles.icon} ${styles.eyeIcon}`}
              />
              <span>Vista</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={styles.menuIcon}
              onClick={() => setOpen(false)}
            >
              <Image
                src="/img/exit-icon.png"
                alt=""
                width={30}
                height={30}
                draggable="false"
                className={`${styles.icon} ${styles.exitIcon}`}
              />
              <span>Fechar</span>
            </button>
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

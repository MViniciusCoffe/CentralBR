import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Image from "next/image";
import SettingsPanel from "../components/SettingsPanel/SettingsPanel";

const Globe = dynamic(() => import("../components/Globe"), {
  ssr: false,
  loading: () => <div className={styles.mainLoader}>Carregando mapa...</div>,
});

export default function Home() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [coords, setCoords] = useState(null);

  function formatCoordToDegree(value, isLat) {
    const abs = Math.abs(value);

    const degrees = Math.floor(abs);
    const minutesFloat = (abs - degrees) * 60;
    const minutes = Math.floor(minutesFloat);

    const seconds = Math.floor((minutesFloat - minutes) * 60);

    const direction = isLat ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W";

    return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.globoWrapper}>
          <Globe onCoordsChange={setCoords} />
        </div>
        <div className={styles.windRose}>
          <Image
            src="/img/wind-rose.png"
            alt="Wind Rose"
            width={120}
            height={120}
            priority
            draggable="false"
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Dados públicos · Projeto de portfólio</p>
        <p>
          {coords
            ? `${formatCoordToDegree(coords.lat, true)} | ${formatCoordToDegree(coords.lng, false)}`
            : "Passe o mouse sobre o globo"}
        </p>
        <div className={styles.configIcon}>
          <Image
            src="/img/config-icon.png"
            alt="Configurações"
            width={50}
            height={50}
            priority
            draggable="false"
            onClick={() => setSettingsOpen(!settingsOpen)}
          />
        </div>
      </footer>

      <SettingsPanel 
        open={settingsOpen}
        setOpen={setSettingsOpen}
      />
    </div>
  );
}

import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';
import { useState } from 'react'

const Globe = dynamic(() => import('../components/Globe'), {
  ssr: false,
  loading: () => <div className={styles.homeLoading}>Carregando mapa...</div>
});

export default function Home() {
  const [coords, setCoords] = useState(null);

  function formatCoordToDegree(value, isLat) {
    const abs = Math.abs(value);

    const degrees = Math.floor(abs)
    const minutesFloat = (abs - degrees) * 60
    const minutes = Math.floor(minutesFloat);

    const seconds = Math.floor((minutesFloat - minutes) * 60)

    const direction = isLat
      ? value >= 0 ? 'N' : 'S'
      : value >= 0 ? 'E' : 'W'

    return `${degrees}° ${minutes}' ${seconds}" ${direction}`
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>CentralBR</h1>
        <p>Clique nos estados para ver as estatísticas</p>
      </header>

      <main className={styles.main}>
        <div className={styles.globoWrapper}>
          <Globe onCoordsChange={setCoords} />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Dados públicos · Projeto de portfólio</p>
        <div>
          {coords
            ? `${formatCoordToDegree(coords.lat, true)} | ${formatCoordToDegree(coords.lng, false)}`
            : 'Passe o mouse sobre o globo'}
        </div>
      </footer>
    </div>
  );
}
// import Globe from '../components/Globe';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css'; // se tiver CSS module

const Globe = dynamic(() => import('../components/Globe'), {
  ssr: false,
  loading: () => <div>Carregando mapa...</div>
});

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>CentralBR - Mapa Eleitor 3D</h1>
        <p>Clique nos estados para ver os candidatos</p>
      </header>

      <main className={styles.main}>
        <div className={styles.globoWrapper}>
          <Globe />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Dados públicos · Projeto de portfólio</p>
      </footer>
    </div>
  );
}
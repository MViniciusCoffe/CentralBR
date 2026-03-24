import styles from "./ZoomControl.module.css";

export default function ZoomControl() {
  return (
    <div className={styles.zoomControl}>
      <button>+</button>
      <button>-</button>
    </div>
  )
}
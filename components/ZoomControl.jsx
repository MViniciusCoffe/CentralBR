import styles from "./ZoomControl.module.css";

export default function ZoomControl() {
  return (
    <div className={styles.zoomControl}>
      <button type="button">+</button>
      <button type="button">-</button>
    </div>
  );
}

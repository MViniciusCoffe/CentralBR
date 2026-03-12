import { MapProvider } from "../context/MapContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MapProvider>
      <Component {...pageProps} />
    </MapProvider>
  );
}

export default MyApp;

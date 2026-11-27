import { MapProvider } from "../context/MapContext";
import "../styles/globals.css";

export const metadata = {
  title: "CentralBR",
  description:
    "Explore as regiões e os estados do Brasil em um globo interativo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <MapProvider>{children}</MapProvider>
      </body>
    </html>
  );
}
